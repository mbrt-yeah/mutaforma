import { CoText, Doc } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { TextConverter } from "./text-converter.js";

const config = DocxToHtmlConfigDefault;
const doc = new Doc();
const registry = new DocxElementConverterRegistry(config, doc);

describe(`${TextConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${TextConverter.name}`, () => {
            const instance = new TextConverter(config, doc, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(TextConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:t element to ${CoText.name} node`, async () => {
            const $elem = cheerio.load(`<w:t>Hello World</w:t>`, { xmlMode: true }, false);
            const instance = new TextConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const text = executionResult.unwrap();

            expect(text).not.toBeNull();
            expect(text).not.toBeUndefined();
            expect(text).toBeInstanceOf(CoText);
            expect(text.childNodesTotal).toBe(0);
            expect(text.value).toBe("Hello World");
        });
    });
});