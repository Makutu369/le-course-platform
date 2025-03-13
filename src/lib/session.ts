import { sessions, User } from "@/db/schema";
import { sign } from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { SessionData, signToken, verifyToken } from "./jwt";
import { and, eq } from "drizzle-orm";

export async function setSession(user: User) {
  const { db } = await import("@/db");
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: { id: user.id, role: user.role },
    expires: expiresInOneDay.toISOString(),
  };

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

  await db.insert(sessions).values({
    userId: user.id,
    token,
    ...deviceInfo,
    expiresAt: expiresInOneDay,
  });

  (await cookies()).set("session", token, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function getSession() {
  const { db } = await import("@/db");
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie?.value) return null;

  const session = await db.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.token, sessionCookie.value),
  });
  if (!session) return null;

  const sessionData = await verifyToken(sessionCookie.value);
  if (!sessionData?.user?.id || typeof sessionData.user.id !== "number")
    return null;
  if (new Date(sessionData.expires) < new Date()) return null;

  await db
    .update(sessions)
    .set({ lastActiveAt: new Date() })
    .where(eq(sessions.id, session.id));

  return session;
}

export async function terminateSession(sessionId: string) {
  const { db } = await import("@/db");
  const currentUser = await getSession();
  if (!currentUser?.userId) throw new Error("Unauthorized");

  const result = await db
    .delete(sessions)
    .where(
      and(eq(sessions.id, sessionId), eq(sessions.userId, currentUser.userId))
    )
    .returning();

  return result.length > 0;
}
