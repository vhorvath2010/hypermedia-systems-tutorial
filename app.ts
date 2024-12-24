import { Hono } from "@hono/hono";
import { Index } from "./templates/index.ts";
import { Contact } from "./business/contact.ts";

const app = new Hono();
app.get("/", (c) => c.redirect("/contacts"));

app.get("/contacts", (c) => {
  const query = c.req.query("q");
  const contacts = query ? Contact.search(query) : Contact.all();
  return c.html(Index({ contacts, query }));
});

Deno.serve(app.fetch);
