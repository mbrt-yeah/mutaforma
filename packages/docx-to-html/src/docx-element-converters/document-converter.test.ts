import { CoBody, CoDocument, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import { Mock } from "ts-mockery";
import * as cheerio from "cheerio";

import { DocumentConverter } from "./document-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

const config = DocxToHtmlConfigDefault;
const docxFile = Mock.of<DocxFile>();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${DocumentConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocumentConverter.name}`, () => {
            const instance = new DocumentConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocumentConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:document element to ${CoDocument.name} node`, async () => {
            const $elem = cheerio.load(`<w:document></w:document>`, null, false);
            const instance = new DocumentConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoDocument);
            expect(result.childNodesTotal).toBe(0);
        });
        it(`should convert w:document element to ${CoDocument.name} node containing one ${CoBody.name} node`, async () => {
            const $elem = cheerio.load(`<w:document><w:body></w:body></w:document>`, null, false);
            const instance = new DocumentConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoDocument);
            expect(result.childNodesTotal).toBe(1);
            expect(result.childNodes[0]).toBeInstanceOf(CoBody);
        });
    });
});