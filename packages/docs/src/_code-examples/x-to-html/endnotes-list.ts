import type { TCodeExampleIO } from "../../_models/t-code-example-io";

const EndnotesListDefaultExample: TCodeExampleIO = {
  from: `"endnotesList": {
  "enabled": true,
  "element": {
    "name": "ul"
  }
}`,
  to: `<ul>
  ...
</ul>`,
};

const EndnotesListCustomElementExample: TCodeExampleIO = {
  from: `"endnotesList": {
  "enabled": true,
  "element": {
    "name": "ol",
  }
}`,
  to: `<ol>
  ...
</ol>`,
};

const EndnotesListCustomAttrsExample: TCodeExampleIO = {
  from: `"endnotesList": {
    "enabled": true,
    "element": {
      "name": "ul",
      "attrs": {
        "class": "endnotes-list"
    }
  }`,
  to: `<ul class="endnotes-list">
  ...
</ul>`,
};

export {
    EndnotesListCustomAttrsExample,
    EndnotesListCustomElementExample,
    EndnotesListDefaultExample
};
