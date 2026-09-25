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
      totalRegistrations: result.totalRegistrations,
      emailSent: result.emailSent,
      message: result.message || "Registration successful! Your application has been saved and the updated Master Excel sheet was emailed to the admin.",
    });
  } catch (error: any) {
    console.error("Opportunity Register API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process opportunity registration." },
      { status: 500 }
    );
  }
}
