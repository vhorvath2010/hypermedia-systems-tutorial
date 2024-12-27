import { HtmlEscapedString } from "@hono/hono/utils/html";
import { html } from "typed-htmx";

export function Layout(body: HtmlEscapedString | Promise<HtmlEscapedString>) {
  return html`<html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact App</title>
      <script src="https://unpkg.com/htmx.org@2.0.4"></script>
    </head>
    <body hx-boost="true">
      ${{ $$child: body }}
    </body>
  </html>`;
}
