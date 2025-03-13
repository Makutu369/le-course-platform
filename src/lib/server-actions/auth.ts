import { findUserByEmail, comparePassword, createUser } from '../queries/auth';
import { generateToken } from '../queries/auth';
"use server";



export async function handleLogin(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      console.log("Please provide both email and password.");
      return { error: "Please provide both email and password." };
    }

    const user = await findUserByEmail(email);
    if (!user.length) {
      console.log("User not found.");
      return { error: "User not found." };
    }

    const isValid = await comparePassword(password, user[0].password);
    if (!isValid) {
      console.log("Invalid credentials.");
      return { error: "Invalid credentials." };
    }

    const token = generateToken({ id: user[0].id, email: user[0].email, role: user[0].role });
    console.log("Login successful, Token:", user );

    return { success: true, token, user: user[0] };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "An error occurred during login." };
  }
}



export async function handleSignup(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!email || !password || !firstName || !lastName) {
      return { error: "All fields are required." };
    }

    const newUser = await createUser(email, password, firstName, lastName);

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An error occurred during signup." };
  }
}
