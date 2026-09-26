import { NextResponse } from "next/server";
import { processRegistration, sendInstantOwnerNotification } from "@/lib/registrationBatchService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organizationName, contactName, email, phone, partnerType, message } = body;

    if (!contactName || !email || !organizationName) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields (Organization, Contact Name, Email)." },
        { status: 400 }
      );
    }

    // 1. Record submission into Supabase contact_submissions & registrations tables
    await processRegistration({
      source: "PARTNERSHIP",
      fullName: contactName,
      email,
      phone: phone || "",
      opportunityTitle: organizationName,
      category: partnerType || "Partnership Inquiry",
      message: `[Organization: ${organizationName}] ${message || ""}`,
      metadata: { organizationName, partnerType },
    });

    // 2. Dispatch instant email notification to site owner
    await sendInstantOwnerNotification({
      source: "PARTNERSHIP",
      fullName: `${contactName} (${organizationName})`,
      email,
      phone,
      category: partnerType,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your partnership inquiry has been registered and emailed to our team.",
    });
  } catch (error: any) {
    console.error("Partnership API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit partnership request." },
      { status: 500 }
    );
  }
}
