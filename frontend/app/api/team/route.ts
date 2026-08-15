import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import { connectDB } from "@/lib/utils/db";
import TeamMember from "@/lib/models/TeamMember";

export async function GET() {
 await connectDB();
 const team = await TeamMember.find().sort({ order: 1 });
 return NextResponse.json(team);
}

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 await connectDB();
 const body = await req.json();
 const member = await TeamMember.create(body);
 return NextResponse.json(member, { status: 201 });
}
