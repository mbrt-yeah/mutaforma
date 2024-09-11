import { CoParagraph, CoTextRun, DocxFile, DocxNumberingLvl, DocxNumberingSchema } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../../docx-element-converter-registry.js";
import { ParagraphConverter } from "./paragraph-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
docxFile.styles["Heading1"] = {
    id: "Heading1",
    idLowercase: "heading1",
    name: "Heading 1",
    type: "paragraph",
    basedOn: ["Normal"],
    basedOnLowercase: ["normal"],
};
docxFile.numberingSchemes["5"] = new DocxNumberingSchema({
    id: "5",
    idAbstract: "5",
    levels: [
        new DocxNumberingLvl({
            level: 0,
            numberingFormat: "bullet",
        })
    ],
});

const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${ParagraphConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${ParagraphConverter.name}`, () => {
            const instance = new ParagraphConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(ParagraphConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:p element to ${CoParagraph.name} node`, async () => {
            const $elem = cheerio.load(`<w:p></w:p>`, null, false);
            const instance = new ParagraphConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoParagraph);
            expect(result.childNodesTotal).toBe(0);
        });
        it(`should convert w:p element to ${CoParagraph.name} node containing one ${CoTextRun.name} node`, async () => {
            const $elem = cheerio.load(`<w:p><w:r></w:r></w:p>`, null, false);
            const instance = new ParagraphConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoParagraph);
            expect(result.childNodesTotal).toBe(1);
            expect(result.childNodes[0]).toBeInstanceOf(CoTextRun);
        });
        it(`should convert w:p element with properties to ${CoParagraph.name} which contains all extracted properties`, async () => {
            const $elem = cheerio.load(`<w:p w14:paraId="52B751E6" w14:textId="1E521E85" w:rsidR="00187371" w:rsidRPr="00187371" w:rsidRDefault="0075236E" w:rsidP="009055DC"><w:pPr><w:pStyle w:val="Heading1" /><w:numPr><w:ilvl w:val="0" /><w:numId w:val="5" /></w:numPr><w:rPr><w:lang w:val="en-US" /></w:rPr></w:pPr><w:r><w:rPr><w:lang w:val="en-US" /></w:rPr><w:t>Heading 1 numbered</w:t></w:r></w:p>`, null, false);
            const instance = new ParagraphConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoParagraph);
            expect(result.indentationLevel).toBe(0);
            expect(result.mapping).not.toBeNull();
            expect(result.mapping).not.toBeUndefined();
            expect(result.mapping?.names.length).toBe(1);
            expect(result.mapping?.names[0]).toBe("Heading 1");
            expect(result.mapping?.element.name).toEqual("h1");
            expect(result.mapping?.element.attrs).toEqual({});
            expect(result.numberingFormat).toBe("bullet");
        });
    });
});
