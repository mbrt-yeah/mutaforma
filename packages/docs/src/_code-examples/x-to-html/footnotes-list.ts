import type { TCodeExampleIO } from "../../_models/t-code-example-io";

const FootnotesListDefaultExample: TCodeExampleIO = {
  from: `"footnotesList": {
  "enabled": true,
  "element": {
    "name": "ul"
  }
}`,
  to: `<ul>
  ...
</ul>`,
};

const FootnotesListCustomElementExample: TCodeExampleIO = {
  from: `"footnotesList": {
  "enabled": true,
  "element": {
    "name": "ol",
  }
}`,
  to: `<ol>
  ...
</ol>`,
};

const FootnotesListCustomAttrsExample: TCodeExampleIO = {
  from: `"footnotesList": {
    "enabled": true,
    "element": {
      "name": "ul",
      "attrs": {
        "class": "footnotes-list"
    }
  }`,
  to: `<ul class="footnotes-list">
  ...
</ul>`,
};

export {
    FootnotesListCustomAttrsExample,
    FootnotesListCustomElementExample,
    FootnotesListDefaultExample
};
