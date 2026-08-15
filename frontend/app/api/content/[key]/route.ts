import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  await connectDB();
  const content = await SiteContent.findOne({ key });
  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}

// Auth check for this happens in middleware.ts (write access to
// /api/content/* requires a valid session). Upserts by key so the
// dashboard can save even before a doc exists for that key.
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Body must be a JSON object of fields" },
      { status: 400 }
    );
  }

  await connectDB();
  const content = await SiteContent.findOneAndUpdate(
    { key },
    { key, fields: body, updatedAt: new Date() },
    { upsert: true, new: true }
  );

  return NextResponse.json(content);
}