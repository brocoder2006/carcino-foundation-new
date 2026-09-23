import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (fullName, email, message)." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const submissionId = "SUB-" + Date.now();

    // 1. Store contact submission in Supabase PostgreSQL database
    let dbSuccess = false;
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from("contact_submissions").insert({
          full_name: fullName,
          email,
          phone: phone || "",
          subject: subject || "General Inquiry",
          message,
          created_at: timestamp,
        });
        if (!error) dbSuccess = true;
      } catch (dbErr) {
        console.error("Supabase insert error:", dbErr);
      }
    }

    // 2. Generate Excel spreadsheet (.xlsx) using XLSX
    const excelData = [
      {
        "Submission ID": submissionId,
        "Timestamp": timestamp,
        "Full Name": fullName,
        "Email Address": email,
        "Phone Number": phone || "N/A",
        "Subject": subject || "General Inquiry",
        "Message": message,
        "Database Saved": dbSuccess ? "Yes (Supabase Postgres)" : "Local/Memory",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Adjust column widths
    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 24 },
      { wch: 25 },
      { wch: 30 },
      { wch: 18 },
      { wch: 25 },
      { wch: 50 },
      { wch: 22 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Submissions");

    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // 3. Send email to owner with Excel sheet attachment using Nodemailer
    const ownerEmail = process.env.OWNER_EMAIL || "carcinofoundation.contact@gmail.com";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";

    let emailDispatched = false;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Carcino Foundation Portal" <${smtpUser}>`,
          to: ownerEmail,
          subject: `[New Contact Submission] ${subject || "Inquiry"} from ${fullName}`,
          text: `New contact submission received from ${fullName} (${email}). Detailed Excel sheet attached.`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #0b0b0c; color: #f8f8f8; padding: 24px; border-radius: 16px;">
              <h2 style="color: #c27aff;">New Contact Submission Received</h2>
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #39c69c;">${email}</a></p>
              <p><strong>Phone Number:</strong> ${phone || "N/A"}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background-color: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-top: 16px;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap; color: #d5b0ff;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #888; margin-top: 24px;">An Excel file containing this submission detail is attached to this email.</p>
            </div>
          `,
          attachments: [
            {
              filename: `Contact_Submission_${submissionId}.xlsx`,
              content: excelBuffer,
              contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
          ],
        });
        emailDispatched = true;
      } catch (mailErr) {
        console.error("Nodemailer error sending email:", mailErr);
      }
    } else {
      console.log(`[Contact API] Submission received. Excel generated (${excelBuffer.length} bytes). Set SMTP_USER and SMTP_PASS to dispatch live emails.`);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      emailDispatched,
      message: "Contact form submitted successfully and Excel sheet generated for owner notification.",
    });
  } catch (error: any) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process contact submission." },
      { status: 500 }
    );
  }
}
