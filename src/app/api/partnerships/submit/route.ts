import { NextResponse } from "next/server";
import { processRegistration, sendInstantOwnerNotification } from "@/lib/registrationBatchService";
import { checkRateLimit, getClientIp, isValidEmail, sanitizeBoundedString } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`partnership:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.` },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawOrgName = sanitizeBoundedString(body.organizationName, 150);
    const rawContactName = sanitizeBoundedString(body.contactName, 120);
    const rawEmail = sanitizeBoundedString(body.email, 254).toLowerCase();
    const rawPhone = sanitizeBoundedString(body.phone, 30);
    const rawPartnerType = sanitizeBoundedString(body.partnerType, 100);
    const rawMessage = sanitizeBoundedString(body.message, 5000);

    if (!rawContactName || !rawEmail || !rawOrgName) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields (Organization, Contact Name, Email)." },
        { status: 400 }
      );
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 1. Record submission into Supabase contact_submissions & registrations tables
    await processRegistration({
      source: "PARTNERSHIP",
      fullName: rawContactName,
      email: rawEmail,
      phone: rawPhone,
      opportunityTitle: rawOrgName,
      category: rawPartnerType || "Partnership Inquiry",
      message: `[Organization: ${rawOrgName}] ${rawMessage}`,
      metadata: { organizationName: rawOrgName, partnerType: rawPartnerType },
    });

    // 2. Dispatch instant email notification to site owner
    await sendInstantOwnerNotification({
      source: "PARTNERSHIP",
      fullName: `${rawContactName} (${rawOrgName})`,
      email: rawEmail,
      phone: rawPhone,
      category: rawPartnerType,
      message: rawMessage,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your partnership inquiry has been registered and emailed to our team.",
    });
  } catch (error: any) {
    console.error("Partnership API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit partnership request." },
      { status: 500 }
    );
  }
}
