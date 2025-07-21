
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { checkAdditionalInfoAdded } = await import("@/lib/queries/auth");
    const sessionCookie = req.cookies.get("session");

    if (!sessionCookie) {
      const isNotAuthenticated = true;
      console.log("Session cookie not found. User is not authenticated.");
      return NextResponse.json({ isNotAuthenticated }, { status: 200 });
    }

    const token = sessionCookie.value;


    const isAdded = await checkAdditionalInfoAdded();

    return NextResponse.json({ isAdded }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
