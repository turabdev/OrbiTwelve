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
  // Covers content (Hero/Stats/PVM per-key fields), services-pathway
  // (the pathway collection — was previously ungated for PUT, a real
  // gap, closed here), and about-services (this session's new
  // collection). All three follow the same GET-public/mutate-gated rule.
  const gatedApiPrefixes = [
    "/api/content",
    "/api/services-pathway",
    "/api/about-services",
  ];
  const isGatedApi = gatedApiPrefixes.some((p) => pathname.startsWith(p));
  if (isGatedApi && req.method !== "GET") {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/content/:path*",
    "/api/services-pathway/:path*",
    "/api/about-services/:path*",
  ],
};