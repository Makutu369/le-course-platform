
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {eq} from "drizzle-orm";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";


export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}


export async function createUser(email: string, password: string, firstName: string, lastName: string) {
  const hashedPassword = await hashPassword(password);
  return db.insert(users).values({ email, password: hashedPassword, firstName, lastName, role: "user" }).returning();
}


export async function findUserByEmail(email: string) {
    return db.select().from(users).where(eq(users.email, email)).limit(1);
  }


export function generateToken(user: { id: number; email: string; role: string }) {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "7d" });
}


export async function comparePassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
