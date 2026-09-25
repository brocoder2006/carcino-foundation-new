import { NextResponse } from "next/server";
import { sendMasterExcelEmail } from "@/lib/registrationBatchService";

export async function GET(request: Request) {
  try {
    const result = await sendMasterExcelEmail();
    return NextResponse.json({
      success: result.success,
      totalRegistrations: result.totalRegistrations,
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

export async function POST(request: Request) {
  return GET(request);
}
