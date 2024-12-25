import { Hono } from "@hono/hono";
import { Index } from "./templates/index.ts";
import { Contact } from "./business/contact.ts";
import { NewContact } from "./templates/newContact.ts";

const app = new Hono();
app.get("/", (c) => c.redirect("/contacts"));

app.get("/contacts", (c) => {
  const query = c.req.query("q");
  const contacts = query ? Contact.search(query) : Contact.all();
  return c.html(Index({ contacts, query }));
});

app.get("/contacts/new", (c) => c.html(NewContact({})));

Deno.serve(app.fetch);
