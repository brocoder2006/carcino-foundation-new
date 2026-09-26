import { NextResponse } from "next/server";
import { processRegistration, sendInstantOwnerNotification } from "@/lib/registrationBatchService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, areaOfInterest, availability, experience } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Please fill out your name and email address." },
        { status: 400 }
      );
    }

    // 1. Record submission into Supabase contact_submissions & registrations tables
    await processRegistration({
      source: "VOLUNTEER",
      fullName,
      email,
      phone: phone || "",
      opportunityTitle: `Volunteer - ${areaOfInterest || "General"}`,
      category: areaOfInterest || "Volunteer",
      message: `[Availability: ${availability || "Flexible"}] ${experience || ""}`,
      metadata: { areaOfInterest, availability },
    });

    // 2. Dispatch instant email notification to site owner
    await sendInstantOwnerNotification({
      source: "VOLUNTEER",
      fullName,
      email,
      phone,
      category: `${areaOfInterest || "Volunteer"} (${availability || "Flexible"})`,
      message: experience,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for joining TCF as a volunteer! Your application has been registered and emailed to our team.",
    });
  } catch (error: any) {
    console.error("Volunteer API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit volunteer application." },
      { status: 500 }
    );
  }
}
