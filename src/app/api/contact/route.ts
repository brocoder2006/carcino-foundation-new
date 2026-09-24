import { NextResponse } from "next/server";
import { processRegistration } from "@/lib/registrationBatchService";

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

    const result = await processRegistration({
      source: "CONTACT",
      fullName,
      email,
      phone: phone || "",
      category: subject || "General Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      registrationId: result.registrationId,
      batchId: result.batchId,
      batchNumber: result.batchNumber,
      sequenceInBatch: result.sequenceInBatch,
      batchCompleted: result.batchCompleted,
      emailSent: result.emailSent,
      message: result.batchCompleted
        ? "Thank you! You are submission #10 in this batch. The Excel report has been generated and emailed to the admin."
        : `Thank you! Your contact submission has been saved (Entry ${result.sequenceInBatch}/10 in current batch).`,
    });
  } catch (error: any) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process contact submission." },
      { status: 500 }
    );
  }
}
