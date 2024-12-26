import { Hono } from "@hono/hono";
import { Index } from "./templates/index.ts";
import { Contact } from "./business/contact.ts";
import { NewContact } from "./templates/newContact.ts";
import { serveStatic } from "@hono/hono/deno";

const app = new Hono();
app.get("/", (c) => c.redirect("/contacts"));

app.get("/favicon.ico", serveStatic({ path: "./static/favicon.ico" }));

app.get("/contacts", (c) => {
  const query = c.req.query("q");
  const contacts = query ? Contact.search(query) : Contact.all();
  return c.html(Index({ contacts, query }));
});

app.get("/contacts/new", (c) => c.html(NewContact({})));
app.post("/contacts/new", async (c) => {
  const formData = await c.req.formData();
  Contact.register(
    new Contact({
      first: formData.get("first_name")?.toString(),
      last: formData.get("last_name")?.toString(),
      email: formData.get("email")?.toString(),
      phone: formData.get("phone")?.toString(),
    })
  );
  return c.redirect("/contacts");
});

Deno.serve(app.fetch);
