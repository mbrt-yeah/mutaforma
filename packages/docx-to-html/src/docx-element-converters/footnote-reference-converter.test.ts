import { CoNoteReference, CoParagraph, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { FootnoteReferenceConverter } from "./footnote-reference-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { ParagraphConverter } from "./paragraph-converter/paragraph-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${FootnoteReferenceConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${FootnoteReferenceConverter.name}`, () => {
            const instance = new FootnoteReferenceConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(FootnoteReferenceConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:footnoteReference element to ${CoNoteReference.name} node`, async () => {
            const $elem = cheerio.load(`<w:footnoteReference w:id="1" />`, null, false);
            const instance = new FootnoteReferenceConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result.childNodesTotal).toBe(0);
            expect(result.type).toBe("footnote");
            expect(result.id).toBe("1");
        });

        it(`should convert w:p element which contains two w:footnoteReference elements to ${CoParagraph.name} node containing two ${CoNoteReference.name} descendants`, async () => {
            const $elem = cheerio.load(`<w:p w14:paraId="694C0CD3" w14:textId="19FC3400" w:rsidR="00F747F8" w:rsidRDefault="00F747F8" w:rsidP="00F747F8"><w:r><w:rPr><w:lang w:val="en-US" /></w:rPr><w:t xml:space="preserve">footnote</w:t></w:r><w:r><w:rPr><w:rStyle w:val="FootnoteReference" /><w:lang w:val="en-US" /></w:rPr><w:footnoteReference w:id="1" /></w:r><w:r w:rsidR="002D76A6"><w:rPr><w:lang w:val="en-US" /></w:rPr><w:t>, another footnote</w:t></w:r><w:r w:rsidR="001D77EA"><w:rPr><w:rStyle w:val="FootnoteReference" /><w:lang w:val="en-US" /></w:rPr><w:footnoteReference w:id="2" /></w:r></w:p>`, null, false);
            const instance = new ParagraphConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
        });
    });
});