import type { TCodeExampleIO } from "@/models/t-code-example-io";

const EndnotesHeadingDefaultExample: TCodeExampleIO = {
    from: `"endnotesHeading": {
  "enabled": true,
  "element": {
    "name": "h2",
    "content": "Endnotes"
  }
}`,
    to: `<h2>
  Endnotes
</h2>`,
};

const EndnotesHeadingCustomElementExample: TCodeExampleIO = {
    from: `"endnotesHeading": {
  "enabled": true,
  "element": {
    "name": "div",
    "content": "Endnotes"
  }
}`,
    to: `<div>
  Endnotes
</div>`,
};

const EndnotesHeadingCustomAttrsExample: TCodeExampleIO = {
    from: `"endnotesHeading": {
  "enabled": true,
  "element": {
    "name": "h2",
    "content": "Endnotes",
    "attrs": {
      "class": "endnotes-heading",
      "data-foo": "bar"
    }
  }
}`,
    to: `<h2 
  class="endnotes-heading" 
  data-foo="bar"
>
  Endnotes
</h2>`,
}

const EndnotesHeadingCustomContentExample: TCodeExampleIO = {
    from: `"endnotesHeading": {
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
    EndnotesHeadingCustomAttrsExample,
    EndnotesHeadingCustomContentExample,
    EndnotesHeadingCustomElementExample,
    EndnotesHeadingDefaultExample
};
