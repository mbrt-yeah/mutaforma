import { 
    AElementConverterRegistry,
    CoBody,
    CoDocument,
    CoHeading,
    CoImage,
    CoList,
    CoListItem,
    CoNote,
    CoNoteReference,
    CoParagraph,
    CoTable,
    CoTableCell,
    CoTableRow,
    CoText,
    CoTextRun,
    CoTreeNode,
    IConfig
} from "@mtfm/core-models";

import { ACoConverter } from "./co-converters/a-co-converter.js";
import { CoBodyConverter } from "./co-converters/co-body-converter.js";
import { CoDocumentConverter } from "./co-converters/co-document-converter.js";
import { CoHeadingConverter } from "./co-converters/co-heading-converter.js";
import { CoImageConverter } from "./co-converters/co-image-converter.js";
import { CoListConverter } from "./co-converters/co-list-converter.js";
import { CoListItemConverter } from "./co-converters/co-list-item-converter.js";
import { CoNoteConverter } from "./co-converters/co-note-converter.js";
import { CoNoteReferenceConverter } from "./co-converters/co-note-reference-converter.js";
import { CoParagraphConverter } from "./co-converters/co-paragraph-converter.js";
import { CoTableCellConverter } from "./co-converters/co-table-cell-converter.js";
import { CoTableConverter } from "./co-converters/co-table-converter.js";
import { CoTableRowConverter } from "./co-converters/co-table-row-converter.js";
import { CoTextConverter } from "./co-converters/co-text-converter.js";
import { CoTextRunConverter } from "./co-converters/co-text-run-converter.js";

type TElementConverterList = { 
    [elementName: string]: (
        config: IConfig,
        registry: CoConverterRegistry
    ) => ACoConverter<CoTreeNode>
}

export class CoConverterRegistry extends AElementConverterRegistry<CoTreeNode> {
    private readonly __elementConverters: TElementConverterList;

    public constructor(config: IConfig) {
        super(config);

        this.__elementConverters = {
            [CoBody.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoBodyConverter => {
                return new CoBodyConverter(config, registry)
            },
            [CoDocument.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoDocumentConverter => {
                return new CoDocumentConverter(config, registry)
            },
            [CoImage.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoImageConverter => {
                return new CoImageConverter(config, registry)
            },
            [CoHeading.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoHeadingConverter => {
                return new CoHeadingConverter(config, registry)
            },
            [CoListItem.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoListItemConverter => {
                return new CoListItemConverter(config, registry)
            },
            [CoList.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoListConverter => {
                return new CoListConverter(config, registry)
            },
            [CoNote.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoNoteConverter => {
                return new CoNoteConverter(config, registry)
            },
            [CoNoteReference.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoNoteReferenceConverter => {
                return new CoNoteReferenceConverter(config, registry)
            },
            [CoParagraph.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoParagraphConverter => {
                return new CoParagraphConverter(config, registry)
            },
            [CoTable.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoTableConverter => {
                return new CoTableConverter(config, registry)
            },
            [CoTableCell.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoTableCellConverter => {
                return new CoTableCellConverter(config, registry)
            },
            [CoTableRow.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoTableRowConverter => {
                return new CoTableRowConverter(config, registry)
            },
            [CoTextRun.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoTextRunConverter => {
                return new CoTextRunConverter(config, registry)
            },
            [CoText.name]: (
                config: IConfig,
                registry: CoConverterRegistry
            ): CoTextConverter => {
                return new CoTextConverter(config, registry)
            }
        }
    }

    public getConverter(coTreeNode: CoTreeNode): ACoConverter<CoTreeNode> | undefined {
        const elementConverterFn = this.__elementConverters[coTreeNode.nodeName];

        if (!elementConverterFn || typeof elementConverterFn !== "function")
            return undefined;

        return elementConverterFn(this.config, this);
    }
};
