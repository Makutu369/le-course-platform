import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export default async function middleware(req: NextRequest) {
  const cookieValue = req.cookies.get("session")?.value;
  if (!cookieValue) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const session = await verifyToken(cookieValue);
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
