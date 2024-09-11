import type { TCodeExampleIO } from "@/models/t-code-example-io";

const EndnotesListItemDefaultExample: TCodeExampleIO = {
  from: `"endnotesListItem": {
  "enabled": true,
  "element": {
    "name": "li"
  }
}`,
  to: `<li>
  Endnote text
</li>`,
};

const EndnotesListItemCustomElementExample: TCodeExampleIO = {
  from: `"endnotesListItem": {
  "enabled": true,
  "element": {
    "name": "div",
  }
}`,
  to: `<div>
  Endnote text
</div>`,
};

const EndnotesListItemCustomAttrsExample: TCodeExampleIO = {
  from: `"endnotesListItem": {
    "enabled": true,
    "element": {
      "name": "li",
      "attrs": {
        "class": "endnote-list-item"
    }
  }`,
  to: `<li class="endnote-list-item">
  Endnote text
</li>`,
};

export {
    EndnotesListItemCustomAttrsExample,
    EndnotesListItemCustomElementExample,
    EndnotesListItemDefaultExample
};
