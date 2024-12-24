import { Hono } from "@hono/hono";
import { Index } from "./templates/index.ts";

const app = new Hono();
app.get("/", (c) => c.redirect("/contacts"));

app.get("/contacts", (c) => {
  const query = c.req.query("q");
  return c.html(Index({ query }));
});

Deno.serve(app.fetch);
