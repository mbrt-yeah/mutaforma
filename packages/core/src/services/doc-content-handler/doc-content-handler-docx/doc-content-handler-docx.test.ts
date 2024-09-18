import { describe, expect, it } from "@jest/globals";

import { DocContentHandlerDocx } from "./doc-content-handler-docx.js";
import { DocumentXmlRels } from "./_test/document-xml-rels.js";
import { NumberingXml } from "./_test/numbering-xml.js";
import { StylesXml } from "./_test/styles-xml.js";

describe(`${DocContentHandlerDocx.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocContentHandlerDocx.name} successfully`, () => {
            const instance = new DocContentHandlerDocx();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocContentHandlerDocx);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocContentHandlerDocx.name} successfully and return valid result`, async () => {
            const archive: Record<string, string> = {
                "word/document.xml": "<document></document>",
                "word/endnotes.xml": "<endnotes></endnotes>",
                "word/footnotes.xml": "<footnotes></footnotes>",
                "word/_rels/document.xml.rels": DocumentXmlRels,
                "word/numbering.xml": NumberingXml,
                "word/styles.xml": StylesXml,
            }
            const instance = new DocContentHandlerDocx();
            const executeResult = await instance.execute(archive);
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const doc = executeResult.unwrap();
            expect(doc).not.toBeUndefined();
            expect(doc).not.toBeNull();
            expect(doc.contents).toBe("<document></document>");
            expect(doc.endnotes).toBe("<endnotes></endnotes>");
            expect(doc.footnotes).toBe("<footnotes></footnotes>");
            expect(Object.keys(doc.images).length).toBe(3);
            expect(Object.keys(doc.numberings).length).toBe(6);
            expect(Object.keys(doc.styles).length).toBe(52);
        });
    });
});