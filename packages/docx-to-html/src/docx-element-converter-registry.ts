import {
    AElementConverterRegistry,
    CoTreeNode,
    IConfig,
    IDocxFile 
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
 * @typedef {Object.<string, (config: IConfig, docxFile: IDocxFile, registry: DocxElementConverterRegistry) => ADocxElementConverter<CoTreeNode>>} TElementConverterList
 *
 * @property {string} elementName - The name of the DOCX element.
 * @property {(config: IConfig, docxFile: IDocxFile, registry: DocxElementConverterRegistry) => ADocxElementConverter<CoTreeNode>} elementConverterFn - The function that converts the DOCX element to its corresponding HTML element.
 */
type TElementConverterList = { 
    [elementName: string]: (
        config: IConfig,
        docxFile: IDocxFile,
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
    private readonly __docxFile: IDocxFile;

    /**
     * Creates an instance of DocxElementConverterRegistry.
     *
     * @param {IConfig} config - The configuration settings for the conversion process.
     * @param {IDocxFile} docxFile - The DOCX file to be converted.
     */
    public constructor(config: IConfig, docxFile: IDocxFile) {
        super(config);
        this.__docxFile = docxFile;

        this.__elementConverters = {
            "w:body": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): BodyConverter => {
                return new BodyConverter(config, docxFile, registry);
            },
            "w:br": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): BreakConverter => {
                return new BreakConverter(config, docxFile, registry);
            },
            "w:document": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): DocumentConverter => {
                return new DocumentConverter(config, docxFile, registry);
            },
            "w:drawing": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): DrawingConverter => {
                return new DrawingConverter(config, docxFile, registry);
            },
            "w:endnote": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): EndnoteConverter => {
                return new EndnoteConverter(config, docxFile, registry);
            },
            "w:endnoteReference": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): EndnoteReferenceConverter => {
                return new EndnoteReferenceConverter(config, docxFile, registry);
            },
            "w:footnote": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): FootnoteConverter => {
                return new FootnoteConverter(config, docxFile, registry);
            },
            "w:footnoteReference": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): FootnoteReferenceConverter => {
                return new FootnoteReferenceConverter(config, docxFile, registry);
            },
            "w:p": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): ParagraphConverter => {
                return new ParagraphConverter(config, docxFile, registry);
            },
            "w:r": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): TextRunConverter => {
                return new TextRunConverter(config, docxFile, registry);
            },
            "w:tbl": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): TableConverter => {
                return new TableConverter(config, docxFile, registry);
            },
            "w:tc": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): TableCellConverter => {
                return new TableCellConverter(config, docxFile, registry);
            },
            "w:tr": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): TableRowConverter => {
                return new TableRowConverter(config, docxFile, registry);
            },
            "w:t": (
                config: IConfig,
                docxFile: IDocxFile,
                registry: DocxElementConverterRegistry
            ): TextConverter => {
                return new TextConverter(config, docxFile, registry);
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

        return elementConverterFn(this.config, this.__docxFile, this);
    }
};
