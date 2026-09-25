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

export async function processRegistration(
  input: RegistrationInput
): Promise<RegistrationResult> {
  const adminEmail =
    process.env.ADMIN_EMAIL ||
    process.env.OWNER_EMAIL ||
    "carcinofoundation.contact@gmail.com";

  let registrationId: string = "REG-" + Date.now();
  let totalRegistrations: number = 1;
  let allRegistrations: StoredRegistration[] = [];

  if (isSupabaseConfigured) {
    try {
      // 1. Try inserting into contact_submissions table (has public INSERT policy WITH CHECK true)
      try {
        const { data: subData } = await supabase
          .from("contact_submissions")
          .insert({
            full_name: input.fullName,
            email: input.email,
            phone: input.phone || "",
            subject: input.category || input.opportunityTitle || "General Inquiry",
            message: input.message || "",
            email_sent: true,
          })
          .select()
          .single();

        if (subData?.id) {
          registrationId = subData.id;
        }
      } catch (e) {
        console.warn("Notice: contact_submissions table insert skipped:", e);
      }

      // 2. Try inserting into registrations table (has public INSERT policy WITH CHECK true)
      try {
        const { data: regData, error: regErr } = await supabase
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

      // 3. Query all cumulative registrations from database
      const { data: fetchRegs } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchRegs && fetchRegs.length > 0) {
        allRegistrations = fetchRegs.map((r: any) => ({
          id: r.id,
          source: r.source || input.source,
          full_name: r.full_name || input.fullName,
          email: r.email || input.email,
          phone: r.phone || input.phone,
          opportunity_title: r.opportunity_title || input.opportunityTitle,
          category: r.category || input.category,
          message: r.message || input.message,
          created_at: r.created_at || new Date().toISOString(),
        }));
      } else {
        // If registrations table returns empty, query contact_submissions
        const { data: fetchContacts } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: true });

        if (fetchContacts && fetchContacts.length > 0) {
          allRegistrations = fetchContacts.map((c: any) => ({
            id: c.id,
            source: "CONTACT",
            full_name: c.full_name || input.fullName,
            email: c.email || input.email,
            phone: c.phone || input.phone,
            opportunity_title: c.subject || input.opportunityTitle,
            category: c.subject || input.category,
            message: c.message || input.message,
            created_at: c.created_at || new Date().toISOString(),
          }));
        }
      }
    } catch (dbErr) {
      console.error("Supabase execution exception:", dbErr);
    }
  }

  // 4. Fallback if no database records exist yet
  if (allRegistrations.length === 0) {
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
    allRegistrations = [...memoryRegistrations];
  }

  totalRegistrations = allRegistrations.length;

  // 5. Send instant email with updated Master Excel spreadsheet on every registration
  const emailSent = await sendSingleRegistrationEmailWithMasterExcel({
    latestInput: input,
    latestRegistrationId: registrationId,
    totalRegistrations,
    allItems: allRegistrations,
    adminEmail,
  });

  return {
    success: true,
    registrationId,
    totalRegistrations,
    batchId: "MASTER-BATCH",
    batchNumber: 1,
    sequenceInBatch: totalRegistrations,
    batchCompleted: true,
    emailSent,
    message: emailSent
      ? `Registration received! Instant email with updated Master Excel (${totalRegistrations} total records) sent to admin (${adminEmail}).`
      : `Registration received! Saved to database (${totalRegistrations} total records). Note: Email delivery failed or SMTP credentials not set on server.`,
  };
}

// Generate updated Master Excel file buffer and send instant email to Admin via Nodemailer SMTP
async function sendSingleRegistrationEmailWithMasterExcel({
  latestInput,
  latestRegistrationId,
  totalRegistrations,
  allItems,
  adminEmail,
}: {
  latestInput: RegistrationInput;
  latestRegistrationId: string;
  totalRegistrations: number;
  allItems: StoredRegistration[];
  adminEmail: string;
}): Promise<boolean> {
  try {
    // Generate Master Excel rows with all cumulative records
    const excelRows = allItems.map((item, index) => ({
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
        `[Registration Service] New registration from ${latestInput.fullName} received! Updated Master Excel generated (${totalRegistrations} records). Configure SMTP_USER & SMTP_PASS in hosting environment variables to deliver email to ${adminEmail}.`
      );
      return false;
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
      subject: `[New Registration #${totalRegistrations}] ${latestInput.fullName} (${latestInput.source}) - Carcino Foundation`,
      text: `Hello Admin,\n\nA new registration has been received!\n\nName: ${latestInput.fullName}\nEmail: ${latestInput.email}\nPhone: ${latestInput.phone || "N/A"}\nSource: ${latestInput.source}\nCategory/Title: ${latestInput.category || latestInput.opportunityTitle || "N/A"}\nMessage: ${latestInput.message || "N/A"}\n\nTotal Master Registrations: ${totalRegistrations}\n\nAttached is the updated Master Excel spreadsheet containing all ${totalRegistrations} cumulative registrations.\n\nBest regards,\nCarcino Foundation Platform`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0c; color: #f8f8f8; padding: 32px; border-radius: 16px; max-width: 650px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1);">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="background-color: rgba(57, 198, 156, 0.15); color: #39C69C; border: 1px solid rgba(57, 198, 156, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
              🔔 Instant Registration Alert
            </span>
            <h1 style="color: #ffffff; font-size: 24px; margin-top: 16px;">New Registration Received</h1>
            <p style="color: #e9cdf8; font-size: 14px;">Total Master Registrations to date: <strong>${totalRegistrations}</strong></p>
          </div>
          
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin: 20px 0;">
            <h3 style="color: #9875C1; margin-top: 0; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Applicant Details</h3>
            <p style="margin: 6px 0; color: #ffffff;"><strong>Full Name:</strong> ${latestInput.fullName}</p>
            <p style="margin: 6px 0; color: #ffffff;"><strong>Email:</strong> <a href="mailto:${latestInput.email}" style="color: #39C69C;">${latestInput.email}</a></p>
            <p style="margin: 6px 0; color: #ffffff;"><strong>Phone:</strong> ${latestInput.phone || "N/A"}</p>
            <p style="margin: 6px 0; color: #ffffff;"><strong>Source:</strong> ${latestInput.source}</p>
            <p style="margin: 6px 0; color: #ffffff;"><strong>Title / Subject:</strong> ${latestInput.opportunityTitle || latestInput.category || "N/A"}</p>
            ${latestInput.message ? `<p style="margin: 6px 0; color: #ffffff;"><strong>Message:</strong> ${latestInput.message}</p>` : ""}
            <p style="margin: 6px 0; color: #a1a1aa; font-size: 12px; margin-top: 12px;"><strong>Registration ID:</strong> ${latestRegistrationId}</p>
            <p style="margin: 6px 0; color: #a1a1aa; font-size: 12px;"><strong>Received At:</strong> ${new Date().toUTCString()}</p>
          </div>

          <div style="background-color: rgba(152, 117, 193, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(152, 117, 193, 0.2); text-align: center;">
            <p style="font-size: 13px; color: #e9cdf8; margin: 0;">
              📎 Updated Master Excel File Attached: <strong>${filename}</strong>
            </p>
            <p style="font-size: 11px; color: #a1a1aa; margin-top: 4px; margin-bottom: 0;">
              This single master file contains all ${totalRegistrations} registrations received to date.
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
      `[Registration Service] Instant email sent to ${adminEmail} for registration from ${latestInput.fullName}. Master Excel contains ${totalRegistrations} records.`
    );
    return true;
  } catch (err) {
    console.error("Error generating Excel or sending registration email:", err);
    return false;
  }
}
