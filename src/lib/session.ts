"use server";
import { sessions, User } from "@/db/schema";
import bcrypt from "bcryptjs";
import { cookies, headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { SessionData, signToken, verifyToken } from "./jwt";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function setSession(user: User) {
  const { db } = await import("@/db");
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: { id: user.id, role: user.role, email: user.email },
    expires: expiresInOneDay.toISOString(),
  };
  console.log("Setting session for user:", user); // Log the user object

  if (!user?.id || !user?.role) {
    console.error("User object is missing required fields:", user);
    throw new Error("User object is missing required fields");
  }
  const token = await signToken(session);

  const userAgent = (await headers()).get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const deviceInfo = {
    deviceType: parser.getDevice().type || "desktop",
    browser: `${parser.getBrowser().name || "Unknown"} ${
      parser.getBrowser().version || ""
    }`,
    operatingSystem: `${parser.getOS().name || "Unknown"} ${
      parser.getOS().version || ""
    }`,
    deviceName:
      parser.getDevice().model || parser.getOS().name || "Unknown Device",
  };

  console.log("Device Info:", deviceInfo);
  try {
    const result = await db
      .insert(sessions)
      .values({
        userId: user.id,
        token,
        ...deviceInfo,
        expiresAt: expiresInOneDay,
      })
      .returning();

    console.log("Session insert result:", result); // Log DB insert result

    if (result.length === 0) {
      throw new Error("Failed to insert session into database.");
    }
  } catch (error) {
    console.error("Error inserting session:", error);
    throw new Error("Database insert failed");
  }

  (await cookies()).set("session", token, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function getSession() {
try {
  const { db } = await import("@/db");
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie?.value) return null;

  const session = await db.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.token, sessionCookie.value),
  });

  if (!session) return null;

  const sessionData = await verifyToken(sessionCookie.value);

  if (!sessionData?.user?.id || typeof sessionData.user.id !== "string")
    return null;
  if (new Date(sessionData.expires) < new Date()) return null;

  await db
    .update(sessions)
    .set({ lastActiveAt: new Date() })
    .where(eq(sessions.id, session.id));

  return session;
} catch (error) {
  console.error("Error getting session:", error);
}
}

export async function terminateSession() {
  const { db } = await import("@/db");
  const usersSession = await getSession();

  if (!usersSession?.userId) {
    return { error: "session not found" };
  }

  const result = await db
    .delete(sessions)
    .where(
      and(
        eq(sessions.id, usersSession.id),
        eq(sessions.userId, usersSession.userId)
      )
    )
    .returning();

  console.log("Deletion result:", result);

  if (result.length === 0) {
    return { error: "session not found" };
  }

  (await cookies()).delete("session");

  redirect("/");
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
}

export async function comparaPassword(
  password: string,
  hashedPassword: string
) {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
