# @mtfm/docx-to-html

Provides a command line application for converting documents between various formats.

This package is part of the Mutaforma monorepo.

## Table of contents

- [Installation](#installation)
- [Commands](#commands)
- [License](#license)

## Installation

```
npm install -g @mtfm/cli
```

## Commands

### mtfm docx-to-html

The `mtfm docx-to-html` command is used to convert a DOCX document to an HTML document.

#### Options

| Name short | Name long | Description                                     | Mandatory |
| ---        | ---       | ---                                             | ---       |
| --i        | --input   | Absolute or relative path to input file         | Yes       |
| --o        | --output  | Absolute or relative path to output folder      | Yes       |
| --c        | --config  | Absolute or relative path to configuration file | No        |

#### Example

```bash
mtfm docx-to-html --i path/to/input/file.docx --o path/to/output/folder --c path/to/config/file.json
```

#### Configuration

For a comprehensive overview of all available configuration settings and the required structure 
of the configuration file, please refer to the official [Mutaforma documentation](https://mutaforma.io/documentation).

## License

MIT