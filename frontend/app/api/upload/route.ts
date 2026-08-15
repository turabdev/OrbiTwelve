import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import cloudinary from "@/lib/utils/cloudinary";

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 const timestamp = Math.round(Date.now() / 1000);
 const signature = cloudinary.utils.api_sign_request(
  { timestamp, folder: "orbitwelve" },
  process.env.CLOUDINARY_API_SECRET as string
 );

 return NextResponse.json({
  timestamp,
  signature,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  folder: "orbitwelve",
 });
}
