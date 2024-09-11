import type { TCodeExampleIO } from "@/models/t-code-example-io";

const FootnotesListItemDefaultExample: TCodeExampleIO = {
  from: `"footnotesListItem": {
  "enabled": true,
  "element": {
    "name": "li"
  }
}`,
  to: `<li>
  Footnote text
</li>`,
};

const FootnotesListItemCustomElementExample: TCodeExampleIO = {
  from: `"footnotesListItem": {
  "enabled": true,
  "element": {
    "name": "div",
  }
}`,
  to: `<div>
  Footnote text
</div>`,
};

const FootnotesListItemCustomAttrsExample: TCodeExampleIO = {
  from: `"footnotesListItem": {
    "enabled": true,
    "element": {
      "name": "li",
      "attrs": {
        "class": "footnote-list-item"
    }
  }`,
  to: `<li class="footnote-list-item">
  Footnote text
</li>`,
};

export {
    FootnotesListItemCustomAttrsExample,
    FootnotesListItemCustomElementExample,
    FootnotesListItemDefaultExample
};
