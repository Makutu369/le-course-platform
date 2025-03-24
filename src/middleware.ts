import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

const publicRoutes = ["/"];

async function _verifySession() {
  const session = (await cookies()).get("session");
  if (!session) return null;
  const sessionValue = await verifyToken(session.value);
  return sessionValue;
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const session = await _verifySession();
  if (!isPublicRoute && !session?.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.user &&
    !req.nextUrl.pathname.startsWith("/courses")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/courses", "/courses/:path*"],
};
