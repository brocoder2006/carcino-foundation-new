import { NextResponse } from "next/server";
import { processRegistration, sendInstantOwnerNotification } from "@/lib/registrationBatchService";
import { checkRateLimit, getClientIp, isValidEmail, sanitizeBoundedString } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`volunteer:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.` },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawFullName = sanitizeBoundedString(body.fullName, 120);
    const rawEmail = sanitizeBoundedString(body.email, 254).toLowerCase();
    const rawPhone = sanitizeBoundedString(body.phone, 30);
    const rawArea = sanitizeBoundedString(body.areaOfInterest, 100);
    const rawAvailability = sanitizeBoundedString(body.availability, 100);
    const rawExperience = sanitizeBoundedString(body.experience, 5000);

    if (!rawFullName || !rawEmail) {
      return NextResponse.json(
        { success: false, error: "Please fill out your name and email address." },
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
      source: "VOLUNTEER",
      fullName: rawFullName,
      email: rawEmail,
      phone: rawPhone,
      opportunityTitle: `Volunteer - ${rawArea || "General"}`,
      category: rawArea || "Volunteer",
      message: `[Availability: ${rawAvailability || "Flexible"}] ${rawExperience}`,
      metadata: { areaOfInterest: rawArea, availability: rawAvailability },
    });

    // 2. Dispatch instant email notification to site owner
    await sendInstantOwnerNotification({
      source: "VOLUNTEER",
      fullName: rawFullName,
      email: rawEmail,
      phone: rawPhone,
      category: `${rawArea || "Volunteer"} (${rawAvailability || "Flexible"})`,
      message: rawExperience,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for joining TCF as a volunteer! Your application has been registered and emailed to our team.",
    });
  } catch (error: any) {
    console.error("Volunteer API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit volunteer application." },
      { status: 500 }
    );
  }
}
