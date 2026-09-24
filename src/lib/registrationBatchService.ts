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
  batchId?: string;
  batchNumber?: number;
  sequenceInBatch?: number;
  batchCompleted: boolean;
  emailSent: boolean;
  message: string;
  error?: string;
}

// In-memory fallback batch store if Supabase DB is not connected yet (e.g. local test mode)
interface FallbackRegistration extends RegistrationInput {
  id: string;
  createdAt: string;
  sequenceInBatch: number;
}
let memoryBatchNumber = 1;
let memoryBatch: FallbackRegistration[] = [];

export async function processRegistration(
  input: RegistrationInput
): Promise<RegistrationResult> {
  const BATCH_SIZE = Number(process.env.REGISTRATION_BATCH_SIZE) || 10;
  const adminEmail =
    process.env.ADMIN_EMAIL ||
    process.env.OWNER_EMAIL ||
    "carcinofoundation.contact@gmail.com";

  let registrationId: string = "REG-" + Date.now();
  let batchId: string = "BATCH-" + memoryBatchNumber;
  let batchNumber: number = memoryBatchNumber;
  let sequenceInBatch: number = 1;
  let batchCompleted: boolean = false;
  let batchItems: Array<{
    id: string;
    source: string;
    full_name: string;
    email: string;
    phone?: string;
    opportunity_title?: string;
    category?: string;
    message?: string;
    sequence_in_batch: number;
    created_at: string;
  }> = [];

  if (isSupabaseConfigured) {
    try {
      // 1. Execute atomic Stored Procedure submit_registration in Supabase Postgres
      const { data, error } = await supabase.rpc("submit_registration", {
        p_source: input.source,
        p_full_name: input.fullName,
        p_email: input.email,
        p_phone: input.phone || null,
        p_opportunity_title: input.opportunityTitle || null,
        p_category: input.category || null,
        p_message: input.message || null,
        p_metadata: input.metadata || {},
        p_idempotency_key: input.idempotencyKey || null,
        p_batch_size: BATCH_SIZE,
      });

      if (error) {
        console.error("Supabase submit_registration RPC error:", error);
        // Fallback to table query if RPC isn't initialized yet
        return await processSupabaseDirectFallback(input, BATCH_SIZE, adminEmail);
      }

      if (data && data.length > 0) {
        const row = data[0];
        registrationId = row.registration_id;
        batchId = row.batch_id;
        batchNumber = row.batch_number;
        sequenceInBatch = row.sequence_in_batch;
        batchCompleted = Boolean(row.is_batch_complete);

        // Also insert into existing contact_submissions table for backward compatibility if source is CONTACT
        if (input.source === "CONTACT") {
          try {
            await supabase.from("contact_submissions").insert({
              full_name: input.fullName,
              email: input.email,
              phone: input.phone || "",
              subject: input.category || input.opportunityTitle || "General Inquiry",
              message: input.message || "",
              email_sent: batchCompleted,
            });
          } catch {}
        }

        if (batchCompleted) {
          // Fetch all 10 registrations in this batch to generate Excel report
          const { data: regItems, error: regErr } = await supabase
            .from("registrations")
            .select("*")
            .eq("batch_id", batchId)
            .order("sequence_in_batch", { ascending: true });

          if (!regErr && regItems) {
            batchItems = regItems;
          }
        }
      }
    } catch (dbErr) {
      console.error("Supabase execution exception:", dbErr);
      return await processMemoryFallback(input, BATCH_SIZE, adminEmail);
    }
  } else {
    // Supabase env variables not configured yet: use memory fallback logic
    return await processMemoryFallback(input, BATCH_SIZE, adminEmail);
  }

  // 2. If batch completes (10 registrations reached), generate Excel & Email Admin
  let emailSent = false;
  if (batchCompleted) {
    emailSent = await generateExcelAndSendEmail({
      batchNumber,
      batchId,
      items: batchItems.length > 0 ? batchItems : memoryBatch,
      adminEmail,
    });

    if (isSupabaseConfigured) {
      await supabase
        .from("registration_batches")
        .update({
          status: emailSent ? "SENT" : "GENERATED",
          email_sent_at: emailSent ? new Date().toISOString() : null,
        })
        .eq("id", batchId);
    }
  }

  return {
    success: true,
    registrationId,
    batchId,
    batchNumber,
    sequenceInBatch,
    batchCompleted,
    emailSent,
    message: batchCompleted
      ? `Registration #${sequenceInBatch} received! Batch #${batchNumber} complete (${BATCH_SIZE}/${BATCH_SIZE}). Excel report generated and emailed to admin (${adminEmail}).`
      : `Registration #${sequenceInBatch} received! Saved to Batch #${batchNumber} (${sequenceInBatch}/${BATCH_SIZE}). Excel will be generated when 10 registrations are collected.`,
  };
}

// Fallback logic when Supabase SQL procedure is not created yet
async function processSupabaseDirectFallback(
  input: RegistrationInput,
  batchSize: number,
  adminEmail: string
): Promise<RegistrationResult> {
  // Find PENDING batch
  let { data: batch } = await supabase
    .from("registration_batches")
    .select("*")
    .eq("status", "PENDING")
    .lt("registration_count", batchSize)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!batch) {
    const { data: newBatch } = await supabase
      .from("registration_batches")
      .insert({ status: "PENDING", registration_count: 0 })
      .select()
      .single();
    batch = newBatch;
  }

  const batchId = batch.id;
  const batchNumber = batch.batch_number;
  const sequenceInBatch = (batch.registration_count || 0) + 1;
  const batchCompleted = sequenceInBatch >= batchSize;

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
      batch_id: batchId,
      sequence_in_batch: sequenceInBatch,
    })
    .select()
    .single();

  await supabase
    .from("registration_batches")
    .update({
      registration_count: sequenceInBatch,
      status: batchCompleted ? "PROCESSING" : "PENDING",
    })
    .eq("id", batchId);

  let emailSent = false;
  if (batchCompleted) {
    const { data: items } = await supabase
      .from("registrations")
      .select("*")
      .eq("batch_id", batchId)
      .order("sequence_in_batch", { ascending: true });

    emailSent = await generateExcelAndSendEmail({
      batchNumber,
      batchId,
      items: items || [],
      adminEmail,
    });

    await supabase
      .from("registration_batches")
      .update({
        status: emailSent ? "SENT" : "GENERATED",
        email_sent_at: emailSent ? new Date().toISOString() : null,
      })
      .eq("id", batchId);
  }

  return {
    success: true,
    registrationId: regData?.id || "REG-" + Date.now(),
    batchId,
    batchNumber,
    sequenceInBatch,
    batchCompleted,
    emailSent,
    message: batchCompleted
      ? `Registration #${sequenceInBatch} received! Batch #${batchNumber} complete. Excel emailed to ${adminEmail}.`
      : `Registration #${sequenceInBatch} received! Saved to Batch #${batchNumber} (${sequenceInBatch}/${batchSize}).`,
  };
}

// In-Memory fallback for environments without DB setup
async function processMemoryFallback(
  input: RegistrationInput,
  batchSize: number,
  adminEmail: string
): Promise<RegistrationResult> {
  const sequenceInBatch = memoryBatch.length + 1;
  const regId = "MEM-REG-" + Date.now();
  const item: FallbackRegistration = {
    ...input,
    id: regId,
    createdAt: new Date().toISOString(),
    sequenceInBatch,
  };

  memoryBatch.push(item);
  const batchCompleted = memoryBatch.length >= batchSize;
  const currentBatchNum = memoryBatchNumber;

  let emailSent = false;
  if (batchCompleted) {
    const formattedItems = memoryBatch.map((m) => ({
      id: m.id,
      source: m.source,
      full_name: m.fullName,
      email: m.email,
      phone: m.phone,
      opportunity_title: m.opportunityTitle,
      category: m.category,
      message: m.message,
      sequence_in_batch: m.sequenceInBatch,
      created_at: m.createdAt,
    }));

    emailSent = await generateExcelAndSendEmail({
      batchNumber: currentBatchNum,
      batchId: "MEM-BATCH-" + currentBatchNum,
      items: formattedItems,
      adminEmail,
    });

    // Reset memory batch for next round
    memoryBatch = [];
    memoryBatchNumber += 1;
  }

  return {
    success: true,
    registrationId: regId,
    batchId: "MEM-BATCH-" + currentBatchNum,
    batchNumber: currentBatchNum,
    sequenceInBatch,
    batchCompleted,
    emailSent,
    message: batchCompleted
      ? `Registration #${sequenceInBatch} received! Batch #${currentBatchNum} complete (${batchSize}/${batchSize}). Excel emailed to admin (${adminEmail}).`
      : `Registration #${sequenceInBatch} received! Saved to Batch #${currentBatchNum} (${sequenceInBatch}/${batchSize}).`,
  };
}

// Generate Excel file buffer and send to Admin via Nodemailer SMTP
async function generateExcelAndSendEmail({
  batchNumber,
  batchId,
  items,
  adminEmail,
}: {
  batchNumber: number;
  batchId: string;
  items: Array<any>;
  adminEmail: string;
}): Promise<boolean> {
  try {
    const excelRows = items.map((item, index) => ({
      "#": item.sequence_in_batch || index + 1,
      "Registration ID": item.id,
      "Source": item.source,
      "Full Name": item.full_name || item.fullName,
      "Email Address": item.email,
      "Phone Number": item.phone || "N/A",
      "Opportunity Title": item.opportunity_title || item.opportunityTitle || "N/A",
      "Category / Subject": item.category || item.subject || "General",
      "Message / Details": item.message || "N/A",
      "Created At (UTC)": item.created_at || item.createdAt || new Date().toISOString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    worksheet["!cols"] = [
      { wch: 5 },
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
      `Batch #${batchNumber} Registrations`
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
        `[Registration Batch Service] Batch #${batchNumber} complete! Excel file generated (${excelBuffer.length} bytes). Set SMTP_USER and SMTP_PASS in .env to deliver email to ${adminEmail}.`
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

    const filename = `Carcino_Registrations_Batch_${batchNumber}_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    await transporter.sendMail({
      from: `"Carcino Foundation Platform" <${smtpUser}>`,
      to: adminEmail,
      subject: `[Batch #${batchNumber} Complete] 10 New Registrations Received - Carcino Foundation`,
      text: `Hello Admin,\n\nBatch #${batchNumber} has reached 10 total registrations. Attached is the Excel spreadsheet containing all 10 registration details.\n\nBatch ID: ${batchId}\nTotal Records: 10\nCompletion Time: ${new Date().toUTCString()}\n\nBest regards,\nCarcino Foundation Platform`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b0b0c; color: #f8f8f8; padding: 32px; border-radius: 16px; max-width: 650px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="background-color: rgba(194, 122, 255, 0.15); color: #c27aff; border: 1px solid rgba(194, 122, 255, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold;">
              Batch #${batchNumber} Completion Alert
            </span>
            <h1 style="color: #ffffff; font-size: 24px; margin-top: 16px;">10 New Registrations Collected</h1>
            <p style="color: #e9cdf8; font-size: 14px;">The batch limit of 10 registrations has been reached. Attached is your automated Excel summary.</p>
          </div>
          
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin: 24px 0;">
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Batch Number:</strong> #${batchNumber}</p>
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Batch ID:</strong> ${batchId}</p>
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Total Registrations:</strong> ${items.length}</p>
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Target Email:</strong> ${adminEmail}</p>
            <p style="margin: 6px 0; color: #d5b0ff;"><strong>Generated At:</strong> ${new Date().toUTCString()}</p>
          </div>

          <p style="font-size: 13px; color: #a1a1aa; text-align: center;">
            📎 Excel File Attached: <strong>${filename}</strong>
          </p>
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
      `[Registration Batch Service] Batch #${batchNumber} Excel email successfully sent to ${adminEmail}`
    );
    return true;
  } catch (err) {
    console.error("Error generating Excel or sending batch email:", err);
    return false;
  }
}
