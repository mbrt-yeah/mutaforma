import { 
    Config,
    ConfigHtmlEntities,
    ConfigNoteList,
    ConfigNoteListItem,
    ConfigNotesHeading,
    ConfigNotesWrapper,
    ConfigPrettyPrint,
    ElementDefinition,
    IConfig,
} from "@mtfm/core-models";

export const DocxToHtmlConfigDefault: IConfig = new Config({
    endnotesWrapper: new ConfigNotesWrapper({
        enabled: true,
        element: new ElementDefinition({
            name: "div",
            attrs: {
                class: "endnotes-section"
            }
        })
    }),
    endnotesHeading: new ConfigNotesHeading({
        enabled: true,
        element: new ElementDefinition({
            name: "h2",
            content: "Endnotes",
        })
    }),
    endnotesList: new ConfigNoteList({
        enabled: true,
        element: new ElementDefinition({
            name: "ul",
        })
    }),
    endnotesListItem: new ConfigNoteListItem({
        enabled: true,
        element: new ElementDefinition({
            name: "li",
        })
    }),

    footnotesWrapper: new ConfigNotesWrapper({
        enabled: true,
        element: new ElementDefinition({
            name: "div",
            attrs: {
                class: "footnotes-section"
            }
        })
    }),
    footnotesHeading: new ConfigNotesHeading({
        enabled: true,
        element: new ElementDefinition({
            name: "h2",
            content: "Footnotes",
        })
    }),
    footnotesList: new ConfigNoteList({
        enabled: true,
        element: new ElementDefinition({
            name: "ul",
        })
    }),
    footnotesListItem: new ConfigNoteListItem({
        enabled: true,
        element: new ElementDefinition({
            name: "li",
        })
    }),

    mappings: [
        {
            names: ["Heading 1"],
            element: new ElementDefinition({
                name: "h1",
            }),
        },
        {
            names: ["Normal"],
            element: new ElementDefinition({
                name: "p",
            }),
        },
    ],

    outDocExt: "html",
    outDocFileName: "document",
    outImgFolderName: "images",
    outHtmlEntities: new ConfigHtmlEntities({
        enabled: true,
        options: {
            allowUnsafeSymbols: false,
            decimal: false,
            encodeEverything: false,
            strict: false,
            useNamedReferences: true,
        }
    }),
    outPrettyPrint: new ConfigPrettyPrint({
        enabled: true,
    }),
    outRemoveEmptyParas: true,
});
