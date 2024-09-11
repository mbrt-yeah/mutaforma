# @mtfm/docx-to-html

Provides a converter which converts `.docx` files (documents created by Microsoft Word) to HTML.

This package is part of the Mutaforma monorepo.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

```
npm install @mtfm/docx-to-html
```

## Usage

### Minimum example

The conversion result is not persisted to disk, requiring programmatic handling to store or further process the output.

```typescript
import { DocxToHtmlConverter } from "@mtfm/docx-to-html";

const converter = new DocxToHtmlConverter({
    input: "path/to/the/docx/file.docx",
});

const execOpResult = converter.execute();

if (execOpResult.isErr()) {
    const error = execOpResult.error;
    // Handle error during execution
    return;
}

const finalResult = execOpResult.value;

// Handle the conversion result
```

### Persisting result to disk

To persist the conversion result to disk, simply provide the desired output folder path via the `output` property of the options object passed to the converter. 

If the specified folder structure does not yet exist, it will be automatically created. Furthermore, the conversion result can still be processed programmatically.

```typescript
import { DocxToHtmlConverter } from "@mtfm/docx-to-html";

const converter = new DocxToHtmlConverter({
    input: "path/to/the/docx/file.docx",
    output: "path/to/output/folder",
});

// Same as in minimum example
```

### Customizing conversion configuration

To customize the default conversion configuration, you can specify the path to a custom configuration file in JSON format using the `config` property of the options object passed to the converter.

For a comprehensive overview of all available configuration settings and the required structure of the configuration file, please refer to the official [Mutaforma documentation](https://mutaforma.io/documentation).

```typescript
import { DocxToHtmlConverter } from "@mtfm/docx-to-html";

const converter = new DocxToHtmlConverter({
    input: "path/to/the/docx/file.docx",
    output: "path/to/output/folder",
    config: "path/to/custom/config/file.json",
});

// Same as in minimum example
```

## API

### DocxToHtmlConverter

#### Methods

| Name          | Parameters                    | Returns                                            |
| ---           | ---                           | ---                                                |
| `constructor` | `IDocumentConverterOpts<...>` | `DocxToHtmlConverter`                              |
| `execute`     |                               | `Promise<Result<IDocumentConverterResult, Error>>` |

### IDocumentConverterOpts<string | Buffer>

#### Properties

| Name          | Type                 | Mandatory | Description                                                                   |
| ---           | ---                  | ---       | ---                                                                           |
| `input`       | `string` or `Buffer` | yes       | Either a path to a `*.docx` file on disk or an already buffered `*.docx` file |
| `output`      | `string`             | no        | A path to a folder to which the output should be saved                        |
| `config`      | `string`             | no        | Path to a custom configuration file in JSON format                            |


### IDocumentConverterResult

#### Properties

| Name          | Type       | Mandatory | Description                                 |
| ---           | ---        | ---       | ---                                         |
| `images`      | `IAsset[]` | yes       | All images contained within the *.docx file |
| `document`    | `IAsset`   | yes       | The HTML document                           |

### IAsset

#### Properties

| Name           | Type       | Mandatory | Description                     |
| ---            | ---        | ---       | ---                             |
| `id`           | `string`   | yes       | The asset id                    |
| `data`         | `string`   | yes       | The asset data                  |
| `dataEncoding` | `string`   | yes       | The asset data encoding         | 
| `name`         | `string`   | yes       | The name of the asset           |
| `ext`          | `string`   | yes       | The file extension of the asset |

## License

MIT