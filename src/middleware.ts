import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export default async function middleware(req: NextRequest) {
  const cookieValue = req.cookies.get("session")?.value;
  const session = await verifyToken(cookieValue ?? "");
  if (!cookieValue || !session.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
