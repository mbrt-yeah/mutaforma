import type { TCodeExampleIO } from "../../_models/t-code-example-io";

const EndnotesFullExample: TCodeExampleIO = {
    from: `{
  ...
  "endnotesWrapper": {
    "enabled": true,
    "element": {
      "name": "div",
      "attrs": {
        "class": "endnotes-section"
      }
    }
  },
  "endnotesHeading": {
    "enabled": true,
    "element": {
      "name": "h2",
      "content": "Endnotes"
    }
  },
  "endnotesList": {
    "enabled": true,
    "element": {
      "name": "ul"
    }
  },
  "endnotesListItem": {
    "enabled": true,
    "element": {
      "name": "li"
    }
  }
  ...
}`,
    to: `<div class="endnotes-section">
  <h2>
    Endnotes
  </h2>
  <ul>
    <li>
      Endnote text
    </li>
    ...
  </ul>
</div>`,
};

export { EndnotesFullExample };
