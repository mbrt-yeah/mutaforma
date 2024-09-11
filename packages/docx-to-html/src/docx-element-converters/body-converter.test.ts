import { CoBody, CoParagraph, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { BodyConverter } from "./body-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${BodyConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${BodyConverter.name}`, () => {
            const instance = new BodyConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(BodyConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:body element to ${CoBody.name} node`, async () => {
            const $elem = cheerio.load(`<w:body></w:body>`, null, false);
            const instance = new BodyConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoBody);
            expect(result.childNodesTotal).toBe(0);
        });
        it(`should convert w:body element to ${CoBody.name} node containing one ${CoParagraph.name} node`, async () => {
            const $elem = cheerio.load(`<w:body><w:p></w:p></w:body>`, null, false);
            const instance = new BodyConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoBody);
            expect(result.childNodesTotal).toBe(1);
            expect(result.childNodes[0]).toBeInstanceOf(CoParagraph);
        });
    });
});