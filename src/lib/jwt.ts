import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export type SessionData = {
  user: { id: string; role: string; email: string };
  expires: string;
};

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .setProtectedHeader({ alg: "HS256" })
    .sign(key);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
  return payload as SessionData;
}
