import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/hello/delinto", (c) => {
  return c.json({ name: "makutu" });
});

export const GET = handle(app);
export const POST = handle(app);
export default app as never;
