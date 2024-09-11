import type { TCodeExampleIO } from "@/models/t-code-example-io";

const FootnotesFullExample: TCodeExampleIO = {
    from: `{
  ...
  "footnotesWrapper": {
    "enabled": true,
    "element": {
      "name": "div",
      "attrs": {
        "class": "footnotes-section"
      }
    }
  },
  "footnotesHeading": {
    "enabled": true,
    "element": {
      "name": "h2",
      "content": "Footnotes"
    }
  },
  "footnotesList": {
    "enabled": true,
    "element": {
      "name": "ul"
    }
  },
  "footnotesListItem": {
    "enabled": true,
    "element": {
      "name": "li"
    }
  }
  ...
}`,
    to: `<div class="footnotes-section">
  <h2>
    Footnotes
  </h2>
  <ul>
    <li>
      Footnote text
    </li>
    ...
  </ul>
</div>`,
  };

export { FootnotesFullExample };
