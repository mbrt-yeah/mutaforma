import { CoNote, Doc } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { EndnoteConverter } from "./endnote-converter.js";

const config = DocxToHtmlConfigDefault;
const doc = new Doc();
const registry = new DocxElementConverterRegistry(config, doc);

describe(`${EndnoteConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${EndnoteConverter.name}`, () => {
            const instance = new EndnoteConverter(config, doc, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(EndnoteConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:endnote element to ${CoNote.name} node`, async () => {
            const xml = `<w:endnote w:id="1"><w:p w14:paraId="3C91A2AA" w14:textId="21F3C6E0" w:rsidR="00F747F8" w:rsidRDefault="00F747F8"><w:pPr><w:pStyle w:val="EndnoteText"/></w:pPr><w:r><w:rPr><w:rStyle w:val="EndnoteReference"/></w:rPr><w:endnoteRef/></w:r><w:r><w:t xml:space="preserve">And </w:t></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>this</w:t></w:r><w:proofErr w:type="spellEnd"/><w:r><w:t xml:space="preserve"></w:t></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>is</w:t></w:r><w:proofErr w:type="spellEnd"/><w:r><w:t xml:space="preserve"></w:t></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>the</w:t></w:r><w:proofErr w:type="spellEnd"/><w:r><w:t xml:space="preserve"></w:t></w:r><w:proofErr w:type="spellStart"/><w:r><w:t>end</w:t></w:r><w:r w:rsidR="005E59EF"><w:t>n</w:t></w:r><w:r><w:t>ote</w:t></w:r><w:proofErr w:type="spellEnd"/></w:p></w:endnote>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new EndnoteConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result.id).toBe("1");
            expect(result.type).toBe("endnote");
            expect(result.numberingStyle).toBe(config.endnotesNumbering.style);
        });
    });
});