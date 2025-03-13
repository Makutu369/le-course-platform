import { findUserByEmail, comparePassword, generateToken } from "@/lib/queries/auth";

export default async function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server"; 

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await findUserByEmail(email);
    if (!user.length) {
      console.log("User not found");
      return;
    }

    const isValid = await comparePassword(password, user[0].password);
    if (!isValid) {
      console.log("Invalid credentials");
      return;
    }
console.log(user)
    const token = generateToken({ id: user[0].id, email: user[0].email, role: user[0].role });
    console.log("Login successful, Token:", token);
  }

  return (
    <form action={handleLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
