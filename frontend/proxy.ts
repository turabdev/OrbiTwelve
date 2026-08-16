import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isLoginPage = pathname === "/dashboard/login";

  if (!token && pathname.startsWith("/dashboard") && !isLoginPage) {
    const loginUrl = new URL("/dashboard/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Any write to the content API must be authenticated. GETs stay public
  // (the public site reads content), only mutate methods are gated here.
  if (pathname.startsWith("/api/content") && req.method !== "GET") {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/content/:path*"],
};