import { html } from "@hono/hono/html";
import { Contact } from "../business/contact.ts";

interface IndexParams {
  readonly contacts: Contact[];
  readonly query?: string;
}

export function Index({ contacts, query = "" }: IndexParams) {
  return html`<form action="/contacts" method="GET" class="tool-bar">
      <label for="search">Search Term</label>
      <input id="search" type="search" name="q" value="${query}" />
      <input type="submit" value="Search" />
    </form>
    <table>
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${contacts.map((contact) => {
          return html`<tr>
            <td>${contact.first}</td>
            <td>${contact.last}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
              <a href="/contacts/${contact.id}/edit">Edit</a>
              <a href="/contacts/${contact.id}">View</a>
            </td>
          </tr>`;
        })}
      </tbody>
    </table>
    <p><a href="/contacts/new">Add Contact</a></p>`;
}
