import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return session;
}

export default async function middleware(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
