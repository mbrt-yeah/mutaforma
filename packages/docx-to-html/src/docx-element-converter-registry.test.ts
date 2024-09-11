import { describe, expect, it } from "@jest/globals";
import { DocxFile } from "@mtfm/core-models";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "./docx-element-converter-registry.js";
import { ParagraphConverter } from "./docx-element-converters/paragraph-converter/paragraph-converter.js";
import { BodyConverter } from "./docx-element-converters/body-converter.js";
import { BreakConverter } from "./docx-element-converters/break-converter.js";
import { DocumentConverter } from "./docx-element-converters/document-converter.js";
import { DrawingConverter } from "./docx-element-converters/drawing-converter.js";
import { NoteConverter } from "./docx-element-converters/note-converter.js";
import { TextRunConverter } from "./docx-element-converters/text-run-converter.js";
import { TableConverter } from "./docx-element-converters/table-converter.js";
import { TableCellConverter } from "./docx-element-converters/table-cell-converter.js";
import { TableRowConverter } from "./docx-element-converters/table-row-converter.js";
import { TextConverter } from "./docx-element-converters/text-converter.js";
import { FootnoteReferenceConverter } from "./docx-element-converters/footnote-reference-converter.js";
import { EndnoteReferenceConverter } from "./docx-element-converters/endnote-reference-converter.js";

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
            const $elem = cheerio.load(`<w:foo>Hello World</w:foo>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).toBeUndefined();
        });

        it(`should return an instance of ${BodyConverter.name} when given a w:body for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:body></w:body>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(BodyConverter);
        });

        it(`should return an instance of ${BreakConverter.name} when given a w:br for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:br></w:br>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(BreakConverter);
        });

        it(`should return an instance of ${DocumentConverter.name} when given a w:document for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:document></w:document>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(DocumentConverter);
        });

        it(`should return an instance of ${DrawingConverter.name} when given a w:drawing for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:drawing></w:drawing>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(DrawingConverter);
        });

        it(`should return an instance of ${NoteConverter.name} when given a w:footnote for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:footnote></w:footnote>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(NoteConverter);
        });

        it(`should return an instance of ${FootnoteReferenceConverter.name} when given a w:footnoteReference for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:footnoteReference></w:footnoteReference>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(FootnoteReferenceConverter);
        });

        it(`should return an instance of ${NoteConverter.name} when given a w:endnote for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:endnote></w:endnote>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(NoteConverter);
        });

        it(`should return an instance of ${EndnoteReferenceConverter.name} when given a w:endnoteReference for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:endnoteReference></w:endnoteReference>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(EndnoteReferenceConverter);
        });

        it(`should return an instance of ${ParagraphConverter.name} when given a w:p for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:p></w:p>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(ParagraphConverter);
        });

        it(`should return an instance of ${TextRunConverter.name} when given a w:r for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:r></w:r>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TextRunConverter);
        });

        it(`should return an instance of ${TableConverter.name} when given a w:tbl for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:tbl></w:tbl>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TableConverter);
        });

        it(`should return an instance of ${TableCellConverter.name} when given a w:tc for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:tc></w:tc>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TableCellConverter);
        });

        it(`should return an instance of ${TableRowConverter.name} when given a w:tr for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:tr></w:tr>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TableRowConverter);
        });

        it(`should return an instance of ${TextConverter.name} when given a w:t for which a converter has been registered`, async () => {
            const instance = new DocxElementConverterRegistry(config, docxFile);
            const $elem = cheerio.load(`<w:t></w:t>`, null, false);
            const executeResult = instance.getConverter($elem);

            expect(executeResult).not.toBeUndefined();
            expect(executeResult).toBeInstanceOf(TextConverter);
        });
    });
});