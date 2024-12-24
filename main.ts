import { Hono } from "@hono/hono";

const app = new Hono();
app.get("/", (c) => c.text("Hyperhello"));

Deno.serve(app.fetch);
