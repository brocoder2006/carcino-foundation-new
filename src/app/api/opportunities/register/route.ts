import { NextResponse } from "next/server";
import { processRegistration } from "@/lib/registrationBatchService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, opportunityTitle, category, message, metadata } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (fullName, email)." },
        { status: 400 }
      );
    }

    const result = await processRegistration({
      source: "OPPORTUNITY",
      fullName,
      email,
      phone: phone || "",
      opportunityTitle: opportunityTitle || "General Opportunity",
      category: category || "Opportunity Registration",
      message: message || "",
      metadata: metadata || {},
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
        ? "Registration successful! You completed the current batch of 10. The admin has been notified with the compiled Excel sheet."
        : `Registration successful! Your application has been registered (${result.sequenceInBatch}/10 in current batch).`,
    });
  } catch (error: any) {
    console.error("Opportunity Register API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process opportunity registration." },
      { status: 500 }
    );
  }
}
