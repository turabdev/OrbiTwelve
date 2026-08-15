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
