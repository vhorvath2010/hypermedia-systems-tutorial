import { Hono } from "@hono/hono";
import { Index } from "../src/templates/index.ts";
import { Contact } from "./business/contact.ts";
import { NewContact } from "../src/templates/newContact.ts";
import { serveStatic } from "@hono/hono/deno";
import { ShowContact } from "../src/templates/showContact.ts";
import { EditContact } from "../src/templates/editContact.ts";
import { Layout } from "../src/templates/layout.ts";

const app = new Hono();
app.get("/", (c) => c.redirect("/contacts"));

app.get("/favicon.ico", serveStatic({ path: "./static/favicon.ico" }));

app.get("/contacts", (c) => {
  const query = c.req.query("q");
  const contacts = query ? Contact.search(query) : Contact.all();
  return c.html(Layout(Index({ contacts, query })));
});

app.get("/contacts/new", (c) => c.html(Layout(NewContact({}))));
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
    return c.html(Layout(ShowContact(contact)));
  }
  return c.text("Not found!");
});

app.get("contacts/:id/edit", (c) => {
  const id = c.req.param("id");
  const contact = Contact.find(id);
  if (contact) {
    return c.html(Layout(EditContact(contact)));
  }
  return c.text("Not found!");
});
app.post("contacts/:id/edit", async (c) => {
  const id = c.req.param("id");
  const contact = Contact.find(id);
  const formData = await c.req.formData();
  if (contact) {
    contact.update({
      first: formData.get("first_name")?.toString(),
      last: formData.get("last_name")?.toString(),
      email: formData.get("email")?.toString(),
      phone: formData.get("phone")?.toString(),
    });
    return c.redirect("/contacts/" + id);
  }
  return c.text("Not found!");
});

app.post("contacts/:id/delete", (c) => {
  const id = c.req.param("id");
  const contact = Contact.find(id);
  if (contact) {
    Contact.remove(contact);
    return c.redirect("/contacts");
  }
  return c.text("Not found!");
});

Deno.serve(app.fetch);
