import { html } from "@hono/hono/html";
import { Contact } from "../business/contact.ts";

interface NewContactParams {
  readonly contact?: Contact;
  readonly errors?: { [key: string]: string };
}

export function NewContact({ contact, errors }: NewContactParams) {
  return html`
    <form action="/contacts/new" method="POST">
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
        <span class="error">${errors?.["email"]}</span>
        <p>
          <label for="first_name">First Name</label>
          <input
            name="first_name"
            id="first_name"
            type="text"
            placeholder="First Name"
            value="${contact?.first || ""}"
          />
          <span class="error">${errors?.["first"]}</span>
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
          <span class="error">${errors?.["last"]}</span>
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
          <span class="error">${errors?.["phone"]}</span>
        </p>
      </fieldset>
      <button>Save</button>
    </form>
    <p>
      <a href="/contacts">Back</a>
    </p>
  `;
}
