import { NextResponse } from "next/server";
import { sendDailyMasterExcelDigest } from "@/lib/registrationBatchService";

export async function GET() {
  try {
    const result = await sendDailyMasterExcelDigest();
    return NextResponse.json({
      success: result.success,
      totalRegistrations: result.totalRegistrations,
      emailSent: result.emailSent,
      message: result.message,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Daily digest cron error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute daily digest cron." },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
