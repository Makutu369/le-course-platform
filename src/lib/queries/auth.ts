import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
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
  console.log("User data:", user);

  if (!user) return { error: "unauthorised" };
  const { megaCenter } = user;

  return megaCenter !== null 
}
