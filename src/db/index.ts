import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { config } from "dotenv";
config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("NEXT_PUBLIC_DATABASE_URL is not defined in .env file");
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
