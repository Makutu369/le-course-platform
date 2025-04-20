import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { ADMIN_EMAILS } from "@/lib/utils";
import { checkAdditionalInfoAdded, findUserByEmail } from "./lib/queries/auth";
import { megaCenters } from './db/schema';

const publicRoutes = ["/"];

async function _verifySession() {
  const session = (await cookies()).get("session");
  if (!session) return null;
  return await verifyToken(session.value);
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

 
  if (path.startsWith("/admin")) {
    const sessionCookie = req.cookies.get("session");
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const token = sessionCookie.value;
    try {
      const userData = await verifyToken(token);
      const userEmail = userData?.user?.email;

      console.log("Admin Login Attempt:", userEmail);

      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.url + error));
    }
  }

  

  
  const session = await _verifySession();
  if (!isPublicRoute && !session?.user) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && session?.user && !req.nextUrl.pathname.startsWith("/courses")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const res = await fetch(`${req.nextUrl.origin}/api/additional-info`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  const data = await res.json();
  console.log("Response from additional-info API:", data);
  if (data.isNotAuthenticated){
      return NextResponse.next();
  }
  if (!data.isAdded) {
    return NextResponse.redirect(new URL("/student-info", req.url));
  }

  return NextResponse.next();
}

// Define Middleware Matchers
export const config = {
  matcher: ["/courses",  "/courses/:path*", "/admin/:path*"],
};
