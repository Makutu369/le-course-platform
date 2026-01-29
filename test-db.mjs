
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function testConnection() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is not set");
        return;
    }
    const sql = neon(process.env.DATABASE_URL);
    try {
        const result = await sql`SELECT 1`;
        console.log("Connection successful:", result);
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

testConnection();
