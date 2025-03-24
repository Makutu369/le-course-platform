import { type NextRequest, NextResponse } from "next/server"
import { ADMIN_EMAILS } from "@/lib/utils"
import { verifyToken } from "@/lib/jwt"



export async function middleware(request: NextRequest) {
 
  if (request.nextUrl.pathname.startsWith("/admin")) {
   
   const sessionCookie = request.cookies.get("session")
    if (!sessionCookie) {
      
      return NextResponse.redirect(new URL("/", request.url))
    }

    const token = sessionCookie.value

    try {
     
      const userData = await verifyToken(token)
 
      const userEmail = userData?.user?.email
  
      console.log("userEmail", userEmail)
      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      
        return NextResponse.redirect(new URL("/", request.url))
      }
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url + error))
    }
  }

  
  return NextResponse.next()
}


export const config = {
  matcher: ["/admin/:path*"],
}

