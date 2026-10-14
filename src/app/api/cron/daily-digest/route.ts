import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendMasterExcelEmail } from "@/lib/registrationBatchService";
import { getAdminCronPortalHtml } from "./portalHtml";

/**
 * Constant-time string comparison to prevent timing side-channel attacks.
 */
function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Extracts and validates candidate secret against server process.env.CRON_SECRET.
 */
async function checkAuthorization(request: Request): Promise<boolean> {
  const serverCronSecret = process.env.CRON_SECRET;
  if (!serverCronSecret) {
    // Fail-safe: if CRON_SECRET is not configured on the server, reject all invocations
    return false;
  }

  let candidateSecret: string | null = null;

  // 1. Check Authorization: Bearer <secret>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    candidateSecret = authHeader.slice(7).trim();
  }

  // 2. Check x-cron-secret header
  if (!candidateSecret) {
    candidateSecret = request.headers.get("x-cron-secret")?.trim() || null;
  }

  // 3. Check JSON payload body if POST
  if (!candidateSecret && request.method === "POST" && request.headers.get("content-type")?.includes("application/json")) {
    try {
      const cloned = request.clone();
      const body = await cloned.json();
      if (body.cronSecret && typeof body.cronSecret === "string") {
        candidateSecret = body.cronSecret.trim();
      }
    } catch {
      // Non-JSON body
    }
  }

  if (!candidateSecret) {
    return false;
  }

  return timingSafeCompare(candidateSecret, serverCronSecret);
}

export async function GET(request: Request) {
  const isAuthorized = await checkAuthorization(request);

  if (!isAuthorized) {
    const acceptHeader = request.headers.get("accept") || "";
    // If a human admin visits the URL in a browser, render the interactive portal
    if (acceptHeader.includes("text/html")) {
      return new NextResponse(getAdminCronPortalHtml(), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store, max-age=0",
        },
      });
    }

    // Automated API or non-browser clients receive 401 JSON
    return NextResponse.json(
      { success: false, error: "Unauthorized. Valid CRON_SECRET authorization is required." },
      { status: 401 }
    );
  }

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
      { success: false, error: "Failed to execute daily digest cron." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuthorized = await checkAuthorization(request);

  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid or missing CRON_SECRET." },
      { status: 401 }
    );
  }

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
      { success: false, error: "Failed to execute daily digest cron." },
      { status: 500 }
    );
  }
}
