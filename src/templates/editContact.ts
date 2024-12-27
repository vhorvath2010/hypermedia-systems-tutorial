import { html } from "@hono/hono/html";
import { Contact } from "../business/contact.ts";

export function EditContact(contact: Contact) {
  return html`
    <form action="/contacts/${contact.id}/edit" method="POST">
      <fieldset>
        <legend>Contact Values</legend>
        <p>
          <label for="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value="${contact?.email || ""}"
          />
        </p>
        <p>
          <label for="first_name">First Name</label>
          <input
            name="first_name"
            id="first_name"
            type="text"
            placeholder="First Name"
            value="${contact?.first || ""}"
          />
        </p>
        <p>
          <label for="last_name">Last Name</label>
          <input
            name="last_name"
            id="last_name"
            type="text"
            placeholder="Last Name"
            value="${contact?.last || ""}"
          />
        </p>
        <p>
          <label for="phone">Phone</label>
          <input
            name="phone"
            id="phone"
            type="text"
            placeholder="Phone"
            value="${contact?.phone || ""}"
          />
        </p>
      </fieldset>
      <button>Save</button>
    </form>
    <button
      hx-delete="/contacts/${contact.id}"
      hx-target="body"
      hx-push-url="true"
      hx-confirm="Are you sure you want to delete ${contact.first ||
      "the contact"}?"
    >
      Delete Contact
    </button>
    <p>
      <a href="/contacts">Back</a>
    </p>
  `;
}
