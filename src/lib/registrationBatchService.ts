import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface RegistrationInput {
  source: "CONTACT" | "OPPORTUNITY";
  fullName: string;
  email: string;
  phone?: string;
  opportunityTitle?: string;
  category?: string;
  message?: string;
  metadata?: Record<string, any>;
  idempotencyKey?: string;
}

export interface RegistrationResult {
  success: boolean;
  registrationId?: string;
  totalRegistrations?: number;
  batchId?: string;
  batchNumber?: number;
  sequenceInBatch?: number;
  batchCompleted: boolean;
  emailSent: boolean;
  message: string;
  error?: string;
}

// In-memory fallback registration store if DB operations fail or aren't configured
interface StoredRegistration {
  id: string;
  source: string;
  full_name: string;
  email: string;
  phone?: string;
  opportunity_title?: string;
  category?: string;
  message?: string;
  created_at: string;
}

let memoryRegistrations: StoredRegistration[] = [];

/**
 * Saves incoming registration to database (or memory) in the background.
 * Does NOT send an email per submission to prevent inbox spam.
 */
export async function processRegistration(
  input: RegistrationInput
): Promise<RegistrationResult> {
  let registrationId: string = "REG-" + Date.now();
  let totalRegistrations: number = 1;

  if (isSupabaseConfigured) {
    try {
      // 1. Insert into contact_submissions table if source is CONTACT
      if (input.source === "CONTACT") {
        try {
          const { data: subData } = await supabase
            .from("contact_submissions")
            .insert({
              full_name: input.fullName,
              email: input.email,
              phone: input.phone || "",
              subject: input.category || input.opportunityTitle || "General Inquiry",
              message: input.message || "",
              email_sent: false,
            })
            .select()
            .single();

          if (subData?.id) {
            registrationId = subData.id;
          }
        } catch (e) {
          console.warn("Notice: contact_submissions table insert skipped:", e);
        }
      }

      // 2. Insert into registrations master table
      try {
        const { data: regData } = await supabase
          .from("registrations")
          .insert({
            source: input.source,
            full_name: input.fullName,
            email: input.email,
            phone: input.phone || null,
            opportunity_title: input.opportunityTitle || null,
            category: input.category || null,
            message: input.message || null,
            metadata: input.metadata || {},
          })
          .select()
          .single();

        if (regData?.id) {
          registrationId = regData.id;
        }
      } catch (e) {
        console.warn("Notice: registrations table insert skipped:", e);
      }

      // 3. Count total cumulative registrations
      const { count } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });

      if (count && count > 0) {
        totalRegistrations = count;
      }
    } catch (dbErr) {
      console.error("Supabase execution exception:", dbErr);
    }
  } else {
    // Memory fallback store
    const memoryItem: StoredRegistration = {
      id: registrationId,
      source: input.source,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      opportunity_title: input.opportunityTitle,
      category: input.category,
      message: input.message,
      created_at: new Date().toISOString(),
    };
    memoryRegistrations.push(memoryItem);
    totalRegistrations = memoryRegistrations.length;
  }

  return {
    success: true,
    registrationId,
    totalRegistrations,
    batchId: "MASTER-BATCH",
    batchNumber: 1,
    sequenceInBatch: totalRegistrations,
    batchCompleted: false,
    emailSent: false,
    message: "Thank you for getting in touch with us! Your response has been recorded. Our team will soon contact you.",
  };
}

/**
 * Compiles all cumulative registrations into a single updated Master Excel spreadsheet
 * and emails it to the Admin. Called by cron schedule or on-demand.
 */
export async function sendMasterExcelEmail(
  targetEmail?: string
): Promise<{ success: boolean; totalRegistrations: number; message: string }> {
  const adminEmail =
    targetEmail ||
    process.env.ADMIN_EMAIL ||
    process.env.OWNER_EMAIL ||
    "carcinofoundation.contact@gmail.com";

  let allRegistrations: StoredRegistration[] = [];

  if (isSupabaseConfigured) {
    try {
      const { data: fetchRegs } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchRegs && fetchRegs.length > 0) {
        allRegistrations = fetchRegs.map((r: any) => ({
          id: r.id,
          source: r.source || "REGISTRATION",
          full_name: r.full_name,
          email: r.email,
          phone: r.phone,
          opportunity_title: r.opportunity_title,
          category: r.category,
          message: r.message,
          created_at: r.created_at || new Date().toISOString(),
        }));
      } else {
        const { data: fetchContacts } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: true });

        if (fetchContacts && fetchContacts.length > 0) {
          allRegistrations = fetchContacts.map((c: any) => ({
            id: c.id,
            source: "CONTACT",
            full_name: c.full_name,
            email: c.email,
            phone: c.phone,
            opportunity_title: c.subject,
            category: c.subject,
            message: c.message,
            created_at: c.created_at || new Date().toISOString(),
          }));
        }
      }
    } catch (dbErr) {
      console.error("Error fetching registrations for Master Excel:", dbErr);
    }
  }

  if (allRegistrations.length === 0) {
    allRegistrations = [...memoryRegistrations];
  }

  const totalRegistrations = allRegistrations.length;

  if (totalRegistrations === 0) {
    return {
      success: true,
      totalRegistrations: 0,
      message: "No registrations stored in database yet.",
    };
  }

  try {
    // Generate Master Excel worksheet with all cumulative rows
    const excelRows = allRegistrations.map((item, index) => ({
      "S.No": index + 1,
      "Registration ID": item.id || `REG-${index + 1}`,
      "Source": item.source,
      "Full Name": item.full_name,
      "Email Address": item.email,
      "Phone Number": item.phone || "N/A",
      "Opportunity Title": item.opportunity_title || "N/A",
      "Category / Subject": item.category || "General",
      "Message / Details": item.message || "N/A",
      "Date & Time (UTC)": item.created_at || new Date().toISOString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 38 },
      { wch: 15 },
      { wch: 25 },
      { wch: 30 },
      { wch: 18 },
      { wch: 30 },
      { wch: 22 },
      { wch: 50 },
      { wch: 25 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Master Registrations (${totalRegistrations})`
    );

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || "";
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";

    if (!smtpUser || !smtpPass) {
      console.log(
        `[Registration Digest] Master Excel file generated (${totalRegistrations} records). Configure SMTP_USER & SMTP_PASS in hosting environment variables to deliver email to ${adminEmail}.`
      );
      return {
        success: false,
        totalRegistrations,
        message: `Master Excel generated (${totalRegistrations} records), but SMTP_USER & SMTP_PASS environment variables are missing on the server.`,
      };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const filename = `Carcino_Master_Registrations_Updated_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    await transporter.sendMail({
      from: `"Carcino Foundation Platform" <${smtpUser}>`,
      to: adminEmail,
      subject: `[Daily Digest] Master Registrations Report (${totalRegistrations} Total Records) - Carcino Foundation`,
      text: `Hello Admin,\n\nAttached is the updated Master Excel spreadsheet containing all ${totalRegistrations} cumulative registrations received to date.\n\nTotal Master Registrations: ${totalRegistrations}\nGenerated At: ${new Date().toUTCString()}\n\nBest regards,\nCarcino Foundation Platform`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0c; color: #f8f8f8; padding: 32px; border-radius: 16px; max-width: 650px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1);">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="background-color: rgba(152, 117, 193, 0.15); color: #9875C1; border: 1px solid rgba(152, 117, 193, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
              📊 Daily Master Registrations Report
            </span>
            <h1 style="color: #ffffff; font-size: 24px; margin-top: 16px;">Cumulative Registrations Summary</h1>
            <p style="color: #e9cdf8; font-size: 14px;">Total cumulative records in database: <strong>${totalRegistrations}</strong></p>
          </div>
          
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin: 20px 0;">
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Total Master Registrations:</strong> ${totalRegistrations}</p>
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Recipient Email:</strong> ${adminEmail}</p>
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Generated At:</strong> ${new Date().toUTCString()}</p>
          </div>

          <div style="background-color: rgba(152, 117, 193, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(152, 117, 193, 0.2); text-align: center;">
            <p style="font-size: 13px; color: #e9cdf8; margin: 0;">
              📎 Updated Master Excel File Attached: <strong>${filename}</strong>
            </p>
            <p style="font-size: 11px; color: #a1a1aa; margin-top: 4px; margin-bottom: 0;">
              Contains all ${totalRegistrations} historical contact & opportunity submissions.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename,
          content: excelBuffer,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    });

    console.log(
      `[Registration Digest] Master Excel email (${totalRegistrations} records) successfully sent to ${adminEmail}`
    );
    return {
      success: true,
      totalRegistrations,
      message: `Master Excel report (${totalRegistrations} total records) successfully emailed to ${adminEmail}.`,
    };
  } catch (err: any) {
    console.error("Error generating or emailing Master Excel digest:", err);
    return {
      success: false,
      totalRegistrations,
      message: err.message || "Failed to generate or email Master Excel digest.",
    };
  }
}
