import { NextResponse } from "next/server";
import { processRegistration } from "@/lib/registrationBatchService";
import { checkRateLimit, getClientIp, isValidEmail, sanitizeBoundedString } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.` },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawFullName = sanitizeBoundedString(body.fullName, 120);
    const rawEmail = sanitizeBoundedString(body.email, 254).toLowerCase();
    const rawPhone = sanitizeBoundedString(body.phone, 30);
    const rawSubject = sanitizeBoundedString(body.subject, 150);
    const rawMessage = sanitizeBoundedString(body.message, 5000);

    if (!rawFullName || !rawEmail || !rawMessage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (fullName, email, message)." },
        { status: 400 }
      );
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const result = await processRegistration({
      source: "CONTACT",
      fullName: rawFullName,
      email: rawEmail,
      phone: rawPhone,
      category: rawSubject || "General Inquiry",
      message: rawMessage,
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
      { success: false, error: "Failed to process contact submission." },
      { status: 500 }
    );
  }
}
