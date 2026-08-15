import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import { connectDB } from "@/lib/utils/db";
import Service from "@/lib/models/Service";

export async function GET() {
 await connectDB();
 const services = await Service.find({ published: true }).sort({ order: 1 });
 return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 await connectDB();
 const body = await req.json();
 const service = await Service.create(body);
 return NextResponse.json(service, { status: 201 });
}
