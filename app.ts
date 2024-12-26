import { Hono } from "@hono/hono";
import { Index } from "./templates/index.ts";
import { Contact } from "./business/contact.ts";
import { NewContact } from "./templates/newContact.ts";
import { serveStatic } from "@hono/hono/deno";
import { ShowContact } from "./templates/showContact.ts";
import { EditContact } from "./templates/editContact.ts";

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

app.get("contacts/:id", (c) => {
  const id = c.req.param("id");
  const contact = Contact.find(id);
  if (contact) {
    return c.html(ShowContact(contact));
  }
  return c.text("Not found!");
});

app.get("contacts/:id/edit", (c) => {
  const id = c.req.param("id");
  const contact = Contact.find(id);
  if (contact) {
    return c.html(EditContact(contact));
  }
  return c.text("Not found!");
});

Deno.serve(app.fetch);
