import { NextRequest, NextResponse } from "next/server";
import type { ContactFormData, ContactResponse } from "@/types/contact";

export async function POST(req: NextRequest) {
  const body: ContactFormData = await req.json();
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json<ContactResponse>(
      { success: false, error: "All fields are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json<ContactResponse>(
      { success: false, error: "Invalid email address." },
      { status: 400 }
    );
  }

  // TODO: wire up email service (Resend, etc.) or DB write here
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json<ContactResponse>({ success: true });
}