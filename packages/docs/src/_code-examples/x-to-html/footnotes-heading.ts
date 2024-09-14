import type { TCodeExampleIO } from "../../_models/t-code-example-io";

const FootnotesHeadingDefaultExample: TCodeExampleIO = {
    from: `"footnotesHeading": {
  "enabled": true,
  "element": {
    "name": "h2",
    "content": "Footnotes"
  }
}`,
    to: `<h2>
  Footnotes
</h2>`,
};

const FootnotesHeadingCustomElementExample: TCodeExampleIO = {
    from: `"footnotesHeading": {
  "enabled": true,
  "element": {
    "name": "div",
    "content": "Footnotes"
  }
}`,
    to: `<div>
  Footnotes
</div>`,
};

const FootnotesHeadingCustomAttrsExample: TCodeExampleIO = {
    from: `"footnotesHeading": {
  "enabled": true,
  "element": {
    "name": "h2",
    "content": "Footnotes",
    "attrs": {
      "class": "footnotes-heading",
      "data-foo": "bar"
    }
  }
}`,
    to: `<h2 
  class="footnotes-heading" 
  data-foo="bar"
>
  Footnotes
</h2>`,
}

const FootnotesHeadingCustomContentExample: TCodeExampleIO = {
    from: `"footnotesHeading": {
  "enabled": true,
  "element": {
    "name": "h2",
    "content": "Notes"
  }
}`,
    to: `<h2>
  Notes
</h2>`,
}

export {
    FootnotesHeadingCustomAttrsExample,
    FootnotesHeadingCustomContentExample,
    FootnotesHeadingCustomElementExample,
    FootnotesHeadingDefaultExample
};
