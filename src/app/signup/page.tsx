import { createUser } from "@/lib/queries/auth";

export default async function SignUpPage() {
  async function handleSignup(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const newUser = await createUser(email, password, firstName, lastName);
    console.log("User created:", newUser);
  }

  return (
    <form action={handleSignup}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="text" name="firstName" placeholder="First Name" required />
      <input type="text" name="lastName" placeholder="Last Name" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
