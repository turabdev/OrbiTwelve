import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/db";
import TeamMember from "@/lib/models/TeamMember";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  await connectDB();
  const updated = await TeamMember.findByIdAndUpdate(id, body, { new: true });
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
