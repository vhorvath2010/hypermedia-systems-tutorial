import { HtmlEscapedString } from "@hono/hono/utils/html";
import { html } from "@hono/hono/html";

export function Layout(inner: HtmlEscapedString | Promise<HtmlEscapedString>) {
  return html`<head>
      <script src="https://unpkg.com/htmx.org@2.0.4"></script></head
    >${inner}`;
}
