import { NextResponse } from "next/server";
import { processRegistration } from "@/lib/registrationBatchService";
import { checkRateLimit, getClientIp, isValidEmail, sanitizeBoundedString } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`opportunity:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many registration attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.` },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawFullName = sanitizeBoundedString(body.fullName, 120);
    const rawEmail = sanitizeBoundedString(body.email, 254).toLowerCase();
    const rawPhone = sanitizeBoundedString(body.phone, 30);
    const rawTitle = sanitizeBoundedString(body.opportunityTitle, 150);
    const rawCategory = sanitizeBoundedString(body.category, 100);
    const rawMessage = sanitizeBoundedString(body.message, 5000);

    if (!rawFullName || !rawEmail) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (fullName, email)." },
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
      source: "OPPORTUNITY",
      fullName: rawFullName,
      email: rawEmail,
      phone: rawPhone,
      opportunityTitle: rawTitle || "General Opportunity",
      category: rawCategory || "Opportunity Registration",
      message: rawMessage,
      metadata: typeof body.metadata === "object" && body.metadata !== null ? body.metadata : {},
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
      { success: false, error: "Failed to process opportunity registration." },
      { status: 500 }
    );
  }
}
