import { CoText, CoTextRun, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import { Mock } from "ts-mockery";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { TextRunConverter } from "./text-run-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = Mock.of<DocxFile>();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${TextRunConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${TextRunConverter.name}`, () => {
            const instance = new TextRunConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(TextRunConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:r element to ${CoTextRun.name} node`, async () => {
            const $elem = cheerio.load(`<w:r></w:r>`, null, false);
            const instance = new TextRunConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.childNodesTotal).toBe(0);
        });
        it(`should convert w:r element to ${CoTextRun.name} node containing one ${CoText.name} node`, async () => {
            const $elem = cheerio.load(`<w:r><w:t>Hello World</w:t></w:r>`, null, false);
            const instance = new TextRunConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);

            const text = textRun.childNodes[0] as CoText;

            expect(text.value).toBe("Hello World");
        });
    });
});