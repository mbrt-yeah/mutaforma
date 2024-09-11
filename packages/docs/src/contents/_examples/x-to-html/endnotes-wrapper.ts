import type { TCodeExampleIO } from "@/models/t-code-example-io";

const EndnotesWrapperDefaultExample: TCodeExampleIO = {
  from: `"endnotesWrapper": {
  "enabled": true,
  "element": {
    "name": "div",
    "attrs": {
      "class": "endnotes-section"
    }
  }
}`,
  to: `<div class="endnotes-section">
  ...
</div>`,
};

const EndnotesWrapperCustomElementExample: TCodeExampleIO = {
  from: `"endnotesWrapper": {
  "enabled": true,
  "element": {
    "name": "section",
    "attrs": {
      "class": "endnotes-section"
    }
  }
}`,
  to: `<section class="endnotes-section">
  ...
</section>`,
};

const EndnotesWrapperCustomAttrsExample: TCodeExampleIO = {
  from: `"endnotesWrapper": {
    "enabled": true,
    "element": {
      "name": "div",
      "attrs": {
        "data-section": "endnotes"
      }
    }
  }`,
  to: `<div data-section="endnotes">
  ...
</div>`,
};

export {
    EndnotesWrapperCustomAttrsExample,
    EndnotesWrapperCustomElementExample,
    EndnotesWrapperDefaultExample
};
