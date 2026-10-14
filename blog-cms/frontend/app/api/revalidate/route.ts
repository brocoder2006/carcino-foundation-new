import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret") || request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;

  if (!expectedSecret || !secret) {
    return NextResponse.json(
      { error: "Invalid or missing revalidation secret token" },
      { status: 401 }
    );
  }

  const secretBuf = Buffer.from(secret);
  const expectedBuf = Buffer.from(expectedSecret);

  if (secretBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(secretBuf, expectedBuf)) {
    return NextResponse.json(
      { error: "Invalid or missing revalidation secret token" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { path, tag } = body;

    if (tag) {
      revalidateTag(tag);
    }

    if (path) {
      revalidatePath(path);
    } else {
      // Default revalidate major routes
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath("/pathway");
      revalidatePath("/podcasts");
    }

    return NextResponse.json({
      revalidated: true,
      path: path || "all",
      tag: tag || "all",
      now: Date.now(),
    });
  } catch (err: any) {
    console.error("Cache revalidation error:", err);
    return NextResponse.json(
      { error: "Cache revalidation failed." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Cache revalidation requires POST." },
    { status: 405 }
  );
}
