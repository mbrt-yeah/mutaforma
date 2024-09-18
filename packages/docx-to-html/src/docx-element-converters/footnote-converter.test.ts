import { CoNote, Doc } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { FootnoteConverter } from "./footnote-converter.js";

const config = DocxToHtmlConfigDefault;
const doc = new Doc();
const registry = new DocxElementConverterRegistry(config, doc);

describe(`${FootnoteConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${FootnoteConverter.name}`, () => {
            const instance = new FootnoteConverter(config, doc, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(FootnoteConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:footnote element to ${CoNote.name} node`, async () => {
            const xml = `<w:footnote w:id="3"><w:p w14:paraId="160B5C53" w14:textId="6D7FFCE0" w:rsidR="002D76A6" w:rsidRPr="001D77EA" w:rsidRDefault="002D76A6"><w:pPr><w:pStyle w:val="FootnoteText"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r><w:rPr><w:rStyle w:val="FootnoteReference"/></w:rPr><w:footnoteRef/></w:r><w:r w:rsidRPr="001D77EA"><w:rPr><w:lang w:val="en-US"/></w:rPr><w:t xml:space="preserve">The last footnote</w:t></w:r></w:p></w:footnote>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new FootnoteConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result.type).toBe("footnote");
            expect(result.id).toBe("3");
            expect(result.numberingStyle).toBe(config.footnotesNumbering.style)
        });
    });
});