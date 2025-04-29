import { db } from "@/db";
import { megaCenters, users } from "@/db/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { getSession } from "../session";
import { redirect } from "next/navigation";
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const hashedPassword = await hashPassword(password);
  return db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "user",
    })
    .returning();
}

export async function findUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email)).limit(1);
}

export async function getAllMegaCenters() {
  const centers = await db.select().from(megaCenters);

  return centers;
}

export async function assignUserToMC(MegaCenterId: string) {
  try {
    const sessionData = await getSession();
    const res = await db
      .update(users)
      .set({ megaCenter: MegaCenterId })
      .where(eq(users.id, sessionData?.userId ?? ""));
    return res;
  } catch (error) {
    console.error("Error assigning user to mega center:", error);
    throw error;
  }
}

export async function addUserPhone(phone: string) {
  try {
    const sessionData = await getSession();

    await db
      .update(users)
      .set({ phone: phone })
      .where(eq(users.id, sessionData?.userId ?? ""));
  } catch (error) {
    console.error("Error adding user phone:", error);
    throw error;
  }
}

export function generateToken(user: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "7d" });
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function checkAdditionalInfoAdded() {
  const currentUser = await getSession();
  if (!currentUser) return;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, currentUser.userId),
    columns: {
      phone: true,
      megaCenter: true,
    },
  });

  if (!user) return { error: "unauthorised" };
  const { megaCenter } = user;

  if (!megaCenter) {
    redirect("/student-info");
  }

  redirect("/courses");
}
