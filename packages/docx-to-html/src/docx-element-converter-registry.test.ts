import { describe, expect, it } from "@jest/globals";
import { DocxFile } from "@mtfm/core-models";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { BodyConverter } from "./docx-element-converters/body-converter.js";
import { BreakConverter } from "./docx-element-converters/break-converter.js";
import { DocumentConverter } from "./docx-element-converters/document-converter.js";
import { DocxElementConverterRegistry } from "./docx-element-converter-registry.js";
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

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();

describe(`${DocxElementConverterRegistry.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocxElementConverterRegistry.name} successfully`, () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocxElementConverterRegistry);
        });
    });

    describe("#getConverter", () => {
        it(`should return undefined when given an element for which no converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:foo>Hello World</w:foo>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).toBeUndefined();
        });

        it(`should return an instance of ${BodyConverter.name} when given a w:body for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:body></w:body>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(BodyConverter);
        });

        it(`should return an instance of ${BreakConverter.name} when given a w:br for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:br></w:br>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(BreakConverter);
        });

        it(`should return an instance of ${DocumentConverter.name} when given a w:document for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:document></w:document>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(DocumentConverter);
        });

        it(`should return an instance of ${DrawingConverter.name} when given a w:drawing for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:drawing></w:drawing>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(DrawingConverter);
        });

        it(`should return an instance of ${FootnoteConverter.name} when given a w:footnote for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:footnote></w:footnote>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(FootnoteConverter);
        });

        it(`should return an instance of ${FootnoteReferenceConverter.name} when given a w:footnoteReference for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:footnoteReference></w:footnoteReference>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(FootnoteReferenceConverter);
        });

        it(`should return an instance of ${EndnoteConverter.name} when given a w:endnote for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:endnote></w:endnote>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(EndnoteConverter);
        });

        it(`should return an instance of ${EndnoteReferenceConverter.name} when given a w:endnoteReference for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:endnoteReference></w:endnoteReference>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(EndnoteReferenceConverter);
        });

        it(`should return an instance of ${ParagraphConverter.name} when given a w:p for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:p></w:p>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(ParagraphConverter);
        });

        it(`should return an instance of ${TextRunConverter.name} when given a w:r for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:r></w:r>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TextRunConverter);
        });

        it(`should return an instance of ${TableConverter.name} when given a w:tbl for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:tbl></w:tbl>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TableConverter);
        });

        it(`should return an instance of ${TableCellConverter.name} when given a w:tc for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:tc></w:tc>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TableCellConverter);
        });

        it(`should return an instance of ${TableRowConverter.name} when given a w:tr for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:tr></w:tr>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TableRowConverter);
        });

        it(`should return an instance of ${TextConverter.name} when given a w:t for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:t></w:t>`, { xmlMode: true }, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TextConverter);
        });
    });
});