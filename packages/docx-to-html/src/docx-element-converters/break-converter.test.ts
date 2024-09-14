import { CoBreak, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { BreakConverter } from "./break-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${BreakConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${BreakConverter.name}`, () => {
            const instance = new BreakConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(BreakConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:br element to ${CoBreak.name} node`, async () => {
            const $elem = cheerio.load(`<w:br w:type="page" />`, { xmlMode: true }, false);
            const instance = new BreakConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoBreak);
            expect(result.childNodesTotal).toBe(0);
            expect(result.type).toBe("page");
        });
    });
});