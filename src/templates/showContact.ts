import { html } from "@hono/hono/html";
import { Contact } from "../business/contact.ts";

export function ShowContact(contact: Contact) {
  return html` <h1>${contact.first} ${contact.last}</h1>
    <div>
      <div>Phone: ${contact.phone}</div>
      <div>Email: ${contact.email}</div>
    </div>
    <p>
      <a href="/contacts/${contact.id}/edit">Edit</a>
      <a href="/contacts">Back</a>
    </p>`;
}
