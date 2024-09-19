import {
    IConfig,
} from "@mtfm/core-models";

export const DocxToHtmlConfigDefault: IConfig = {
    endnotesWrapper: {
        enabled: true,
        element: {
            name: "div",
            attrs: {
                class: "endnotes-section"
            }
        }
    },
    endnotesHeading: {
        enabled: true,
        element: {
            name: "h2",
            content: "Endnotes",
        }
    },
    endnotesList: {
        enabled: true,
        element: {
            name: "ul",
        }
    },
    endnotesListItem: {
        enabled: true,
        element: {
            name: "li",
        }
    },
    endnotesNumbering: {
        style: "lower-roman",
        element: {
            name: "span",
            attrs: {
                class: "endnote-number"
            }
        }
    },

    footnotesWrapper: {
        enabled: true,
        element: {
            name: "div",
            attrs: {
                class: "footnotes-section"
            }
        }
    },
    footnotesHeading: {
        enabled: true,
        element: {
            name: "h2",
            content: "Footnotes",
        }
    },
    footnotesList: {
        enabled: true,
        element: {
            name: "ul",
        }
    },
    footnotesListItem: {
        enabled: true,
        element: {
            name: "li",
        }
    },
    footnotesNumbering: {
        style: "decimal",
        element: {
            name: "span",
            attrs: {
                class: "footnote-number"
            }
        }
    },

    inlineFormatting: {
        bold: {
            enabled: true,
            element: {
                name: "strong",
            }
        },
        italic: {
            enabled: true,
            element: {
                name: "em",
            }
        },
        underline: {
            enabled: true,
            element: {
                name: "u",
            }
        },
        strikethrough: {
            enabled: true,
            element: {
                name: "s",
            }
        },
        subscript: {
            enabled: true,
            element: {
                name: "sub",
            }
        },
        superscript: {
            enabled: true,
            element: {
                name: "sup",
            }
        },
    },

    mappings: [
        {
            names: ["Heading 1"],
            element: {
                name: "h1",
            },
        },
        {
            names: ["Normal"],
            element: {
                name: "p",
            },
        },
    ],

    metadata: {
        enabled: true,
        mode: "document",
        charset: "utf-8",
        title: "",
        mappings: {
            "dc:creator": "author",
            "dc:description": "description",
            "cp:keywords": "keywords",
        },
        custom: {},
    },

    outDocExt: "html",
    outDocFileName: "document",
    outImgFolderName: "images",
    outHtmlEntities: {
        enabled: true,
        options: {
            allowUnsafeSymbols: false,
            decimal: false,
            encodeEverything: false,
            strict: false,
            useNamedReferences: true,
        }
    },
    outPrettyPrint: {
        enabled: true,
        options: {}
    },
    outRemoveEmptyParas: true,
};
