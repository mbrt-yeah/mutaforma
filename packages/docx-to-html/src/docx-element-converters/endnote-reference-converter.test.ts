import { CoNoteReference, CoParagraph, CoTextRun, Doc } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { EndnoteReferenceConverter } from "./endnote-reference-converter.js";
import { ParagraphConverter } from "./paragraph-converter/paragraph-converter.js";

const config = DocxToHtmlConfigDefault;
const doc = new Doc();
const registry = new DocxElementConverterRegistry(config, doc);

describe(`${EndnoteReferenceConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${EndnoteReferenceConverter.name}`, () => {
            const instance = new EndnoteReferenceConverter(config, doc, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(EndnoteReferenceConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:endnoteReference element to ${CoNoteReference.name} node`, async () => {
            const $elem = cheerio.load(`<w:endnoteReference w:id="1" />`, null, false);
            const instance = new EndnoteReferenceConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result.childNodesTotal).toBe(0);
            expect(result.type).toBe("endnote");
            expect(result.id).toBe("1");
        });

        it(`should convert w:p element which contains one w:endnoteReference elements to ${CoParagraph.name} node containing one ${CoNoteReference.name} descendants`, async () => {
            const xml = `<w:p w14:paraId="7467F7A1" w14:textId="1D46B4C5" w:rsidR="00F747F8" w:rsidRDefault="00F747F8" w:rsidP="00F747F8"><w:pPr><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r><w:rPr><w:lang w:val="en-US"/></w:rPr><w:t>This is a paragraph with an endnote</w:t></w:r><w:r><w:rPr><w:rStyle w:val="EndnoteReference"/><w:lang w:val="en-US"/></w:rPr><w:endnoteReference w:id="1"/></w:r></w:p>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new ParagraphConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();

            for (const childNode of result.childNodes)
                expect(childNode).toBeInstanceOf(CoTextRun);

            expect(result.childNodes[1].childNodes[0]).toBeInstanceOf(CoNoteReference);
        });
    });
});