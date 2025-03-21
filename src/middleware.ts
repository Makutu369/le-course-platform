import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./lib/jwt";

const publicRoutes = ["/"];

async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return session;
}

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const session = await getSession();
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
