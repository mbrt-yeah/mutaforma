import {
    AElementConverterRegistry,
    CoTreeNode,
    IConfig,
    IDoc
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";

import { ADocxElementConverter } from "./docx-element-converters/a-docx-element-converter.js";
import { BodyConverter } from "./docx-element-converters/body-converter.js";
import { BreakConverter } from "./docx-element-converters/break-converter.js";
import { DocumentConverter } from "./docx-element-converters/document-converter.js";
import { DrawingConverter } from "./docx-element-converters/drawing-converter.js";
import { EndnoteConverter } from "./docx-element-converters/endnote-converter.js";
import { EndnoteReferenceConverter } from "./docx-element-converters/endnote-reference-converter.js";
import { FootnoteConverter } from "./docx-element-converters/footnote-converter.js";
import { FootnoteReferenceConverter } from "./docx-element-converters/footnote-reference-converter.js";
import { ParagraphConverter } from "./docx-element-converters/paragraph-converter/paragraph-converter.js";
import { TableCellConverter } from "./docx-element-converters/table-cell-converter.js";
import { TableConverter } from "./docx-element-converters/table-converter.js";
import { TableRowConverter } from "./docx-element-converters/table-row-converter.js";
import { TextConverter } from "./docx-element-converters/text-converter.js";
import { TextRunConverter } from "./docx-element-converters/text-run-converter.js";

/**
 * A type representing a list of element converter functions for converting DOCX elements to their corresponding HTML elements.
 *
 * @typedef {Object.<string, (config: IConfig, doc: IDoc, registry: DocxElementConverterRegistry) => ADocxElementConverter<CoTreeNode>>} TElementConverterList
 *
 * @property {string} elementName - The name of the DOCX element.
 * @property {(config: IConfig, doc: IDoc, registry: DocxElementConverterRegistry) => ADocxElementConverter<CoTreeNode>} elementConverterFn - The function that converts the DOCX element to its corresponding HTML element.
 */
type TElementConverterList = { 
    [elementName: string]: (
        config: IConfig,
        doc: IDoc,
        registry: DocxElementConverterRegistry
    ) => ADocxElementConverter<CoTreeNode>
}

/**
 * A registry for converting DOCX elements to their corresponding HTML elements.
 *
 * @class DocxElementConverterRegistry
 * @extends {AElementConverterRegistry<CheerioAPI>}
 */
export class DocxElementConverterRegistry extends AElementConverterRegistry<CheerioAPI> {
    private readonly __elementConverters: TElementConverterList;
    private readonly __doc: IDoc;

    /**
     * Creates an instance of DocxElementConverterRegistry.
     *
     * @param {IConfig} config - The configuration settings for the conversion process.
     * @param {IDoc} doc - The doc file to be converted.
     */
    public constructor(config: IConfig, doc: IDoc) {
        super(config);
        this.__doc = doc;

        this.__elementConverters = {
            "w:body": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): BodyConverter => {
                return new BodyConverter(config, doc, registry);
            },
            "w:br": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): BreakConverter => {
                return new BreakConverter(config, doc, registry);
            },
            "w:document": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): DocumentConverter => {
                return new DocumentConverter(config, doc, registry);
            },
            "w:drawing": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): DrawingConverter => {
                return new DrawingConverter(config, doc, registry);
            },
            "w:endnote": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): EndnoteConverter => {
                return new EndnoteConverter(config, doc, registry);
            },
            "w:endnoteReference": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): EndnoteReferenceConverter => {
                return new EndnoteReferenceConverter(config, doc, registry);
            },
            "w:footnote": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): FootnoteConverter => {
                return new FootnoteConverter(config, doc, registry);
            },
            "w:footnoteReference": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): FootnoteReferenceConverter => {
                return new FootnoteReferenceConverter(config, doc, registry);
            },
            "w:p": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): ParagraphConverter => {
                return new ParagraphConverter(config, doc, registry);
            },
            "w:r": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): TextRunConverter => {
                return new TextRunConverter(config, doc, registry);
            },
            "w:tbl": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): TableConverter => {
                return new TableConverter(config, doc, registry);
            },
            "w:tc": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): TableCellConverter => {
                return new TableCellConverter(config, doc, registry);
            },
            "w:tr": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): TableRowConverter => {
                return new TableRowConverter(config, doc, registry);
            },
            "w:t": (
                config: IConfig,
                doc: IDoc,
                registry: DocxElementConverterRegistry
            ): TextConverter => {
                return new TextConverter(config, doc, registry);
            },
        }
    }

    /**
     * Retrieves the appropriate converter for a given DOCX element.
     *
     * @param {CheerioAPI} $elem - The DOCX element wrapped in a Cheerio element to be converted.
     *
     * @returns {ADocxElementConverter<CoTreeNode> | undefined} - The converter for the given DOCX element,
     *          or `undefined` if no converter is found.
     */
    public getConverter($elem: CheerioAPI): ADocxElementConverter<CoTreeNode> | undefined {
        const $root = $elem(":root");
        const rootElement = $root[0];

        if (!rootElement)
            return undefined;

        const elementConverterFn = this.__elementConverters[rootElement.tagName];

        if (!elementConverterFn || typeof elementConverterFn !== "function")
            return undefined;

        return elementConverterFn(this.config, this.__doc, this);
    }
};
