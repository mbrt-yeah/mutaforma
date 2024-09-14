import type { TCodeExampleIO } from "../../_models/t-code-example-io";

const MappingsArrayExample = `{
  mappings: [
    // Add mappings here
  ]
}`;

const MappingsOneToOneExample: TCodeExampleIO = {
  from: `{
  names: ["Heading 1"],
  element: {
    name: "h1",
    attrs: {
      class: "heading-1"
    }
  }
}`,
  to: `<h1 class="heading-1">
  ...
</h1>`,
};

const MappingsManyToOneExample: TCodeExampleIO = {
  from: `{
  names: ["Heading 1", "Heading 2"],
  element: {
    name: "h1",
  }
}`,
  to: `<h1>
  ...
</h1>`,
};

export {
  MappingsArrayExample,
  MappingsOneToOneExample,
  MappingsManyToOneExample
};
