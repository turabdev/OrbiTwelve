import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import { connectDB } from "@/lib/utils/db";
import Project from "@/lib/models/Project";

export async function GET() {
 await connectDB();
 const projects = await Project.find({ published: true }).sort({ order: 1 });
 return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 await connectDB();
 const body = await req.json();
 const project = await Project.create(body);
 return NextResponse.json(project, { status: 201 });
}
