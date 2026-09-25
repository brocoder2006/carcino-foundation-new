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
 * Saves incoming registration to Supabase DB / memory store in background.
 * No email is dispatched on individual submissions.
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

      // 2. Insert into main registrations table
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

      if (count !== null && count > 0) {
        totalRegistrations = count;
      }
    } catch (dbErr) {
      console.error("Supabase execution exception:", dbErr);
    }
  } else {
    // Memory fallback if Supabase is not configured
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
    batchId: "DAILY-DIGEST",
    batchNumber: 1,
    sequenceInBatch: totalRegistrations,
    batchCompleted: false,
    emailSent: false,
    message: "Thank you for getting in touch with us! Your response has been recorded. Our team will soon contact you.",
  };
}

/**
 * Sends a daily digest email to the Admin containing the single updated Master Excel sheet.
 * Can be triggered via a 1-day interval timer or scheduled Cron API route (`/api/cron/daily-digest`).
 */
export async function sendDailyMasterExcelDigest(): Promise<{
  success: boolean;
  totalRegistrations: number;
  emailSent: boolean;
  message: string;
}> {
  const adminEmail =
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
          source: r.source || "CONTACT",
          full_name: r.full_name || "N/A",
          email: r.email || "N/A",
          phone: r.phone || "N/A",
          opportunity_title: r.opportunity_title || "N/A",
          category: r.category || "General",
          message: r.message || "N/A",
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
            full_name: c.full_name || "N/A",
            email: c.email || "N/A",
            phone: c.phone || "N/A",
            opportunity_title: c.subject || "N/A",
            category: c.subject || "General",
            message: c.message || "N/A",
            created_at: c.created_at || new Date().toISOString(),
          }));
        }
      }
    } catch (e) {
      console.error("Error fetching registrations for daily digest:", e);
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
      emailSent: false,
      message: "No registrations recorded yet. Daily digest email skipped.",
    };
  }

  try {
    // Generate Master Excel rows with all cumulative records
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
        `[Daily Digest Service] Master Excel generated (${totalRegistrations} total records). Configure SMTP_USER & SMTP_PASS in hosting environment variables to deliver email to ${adminEmail}.`
      );
      return {
        success: false,
        totalRegistrations,
        emailSent: false,
        message: "Master Excel compiled, but SMTP credentials (SMTP_USER / SMTP_PASS) are missing on server.",
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

    const filename = `Carcino_Master_Registrations_Daily_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    await transporter.sendMail({
      from: `"Carcino Foundation Platform" <${smtpUser}>`,
      to: adminEmail,
      subject: `[Daily Digest] Master Registrations Report (${totalRegistrations} Total Records) - Carcino Foundation`,
      text: `Hello Admin,\n\nHere is your 24-hour daily summary report for The Carcino Foundation platform.\n\nTotal Cumulative Registrations: ${totalRegistrations}\nReport Date: ${new Date().toUTCString()}\n\nAttached is the updated Master Excel spreadsheet containing all ${totalRegistrations} cumulative registrations recorded to date.\n\nBest regards,\nCarcino Foundation Platform`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0c; color: #f8f8f8; padding: 32px; border-radius: 16px; max-width: 650px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1);">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="background-color: rgba(152, 117, 193, 0.15); color: #9875C1; border: 1px solid rgba(152, 117, 193, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
              📅 Daily Summary Digest (24-Hour Interval)
            </span>
            <h1 style="color: #ffffff; font-size: 24px; margin-top: 16px;">Master Registrations Report</h1>
            <p style="color: #e9cdf8; font-size: 14px;">Total Master Registrations in Database: <strong>${totalRegistrations}</strong></p>
          </div>
          
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin: 20px 0;">
            <p style="margin: 6px 0; color: #ffffff;"><strong>Total Registrations Recorded:</strong> ${totalRegistrations}</p>
            <p style="margin: 6px 0; color: #ffffff;"><strong>Target Admin Email:</strong> ${adminEmail}</p>
            <p style="margin: 6px 0; color: #a1a1aa; font-size: 12px; margin-top: 12px;"><strong>Report Date:</strong> ${new Date().toUTCString()}</p>
          </div>

          <div style="background-color: rgba(57, 198, 156, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(57, 198, 156, 0.2); text-align: center;">
            <p style="font-size: 13px; color: #39C69C; margin: 0;">
              📎 Master Excel File Attached: <strong>${filename}</strong>
            </p>
            <p style="font-size: 11px; color: #a1a1aa; margin-top: 4px; margin-bottom: 0;">
              This single master file contains all ${totalRegistrations} registrations recorded in the system.
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
      `[Daily Digest Service] Daily summary email sent to ${adminEmail}. Master Excel contains ${totalRegistrations} records.`
    );
    return {
      success: true,
      totalRegistrations,
      emailSent: true,
      message: `Daily digest email with Master Excel (${totalRegistrations} records) sent to ${adminEmail}.`,
    };
  } catch (err: any) {
    console.error("Error generating daily digest email:", err);
    return {
      success: false,
      totalRegistrations,
      emailSent: false,
      message: err.message || "Failed to send daily digest email.",
    };
  }
}
