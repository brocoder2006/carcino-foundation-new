import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret") || request.nextUrl.searchParams.get("secret");

  const expectedSecret = process.env.REVALIDATION_SECRET || "carcino-cms-revalidation-secret-2026";

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid revalidation secret token" }, { status: 401 });
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
    return NextResponse.json(
      { error: `Cache revalidation failed: ${err.message || err}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
