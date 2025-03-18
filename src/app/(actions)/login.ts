"use server";
import { z } from "zod";
import { validatedAction } from "@/lib/middleware";
import { comparaPassword, hashPassword, setSession } from "@/lib/session";
import { db } from "@/db";
import { NewUser, users } from "@/db/schema";
import { eq } from "drizzle-orm";

const signUpSchema = z
  .object({
    email: z.string({ invalid_type_error: "Invalid Email" }).email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const signInSchema = z.object({
  email: z.string({ invalid_type_error: "Invalid Email" }).email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUp = validatedAction(signUpSchema, async (data) => {
  const { email, password, firstName, lastName } = data;
  console.log("data is", data);
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length) {
    return { error: "Email already taken. Please try again.", data };
  }

  const passwordHash = await hashPassword(password);
  const newUser: NewUser = {
    email,
    password: passwordHash,
    firstName,
    lastName,
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return { error: "Failed to create user. Please try again.", data };
  }
  await setSession(createdUser);
  return { success: true };
});

export const signIn = validatedAction(signInSchema, async (data) => {
  const { email, password } = data;

  const user = await db
    .select({
      user: users,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0 || !user[0]?.user) {
    return { error: "Invalid username or password. Please try again.", data };
  }

  const { user: foundUser } = user[0];

  const isPasswordValid = await comparaPassword(
    password,
    foundUser?.password || ""
  );

  if (!isPasswordValid) {
    return { error: "Invalid username or password. Please try again.", data };
  }
  await setSession(foundUser);
  return { success: true };
});
