import type { TCodeExampleIO } from "@/models/t-code-example-io";

const FootnotesWrapperDefaultExample: TCodeExampleIO = {
  from: `"footnotesWrapper": {
  "enabled": true,
  "element": {
    "name": "div",
    "attrs": {
      "class": "footnotes-section"
    }
  }
}`,
  to: `<div class="footnotes-section">
  ...
</div>`,
};

const FootnotesWrapperCustomElementExample: TCodeExampleIO = {
  from: `"footnotesWrapper": {
  "enabled": true,
  "element": {
    "name": "section",
    "attrs": {
      "class": "footnotes-section"
    }
  }
}`,
  to: `<section class="footnotes-section">
  ...
</section>`,
};

const FootnotesWrapperCustomAttrsExample: TCodeExampleIO = {
  from: `"footnotesWrapper": {
    "enabled": true,
    "element": {
      "name": "div",
      "attrs": {
        "data-section": "footnotes"
      }
    }
  }`,
  to: `<div data-section="footnotes">
  ...
</div>`,
};

export {
    FootnotesWrapperCustomAttrsExample,
    FootnotesWrapperCustomElementExample,
    FootnotesWrapperDefaultExample
};
