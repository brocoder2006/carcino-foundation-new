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
      totalRegistrations: result.totalRegistrations,
      emailSent: result.emailSent,
      message: result.message || "Thank you for getting in touch with us! Your response has been recorded. Our team will soon contact you.",
    });
  } catch (error: any) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process contact submission." },
      { status: 500 }
    );
  }
}
