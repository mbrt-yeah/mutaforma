import { describe, expect, it } from "@jest/globals";
import { join, resolve } from "node:path";

import { DocxFileLoader } from "./docx-file-loader.js";

const dirPath = resolve(__dirname, "../../../../../.test");
const inputPath = join(dirPath, "input");
const outputPath = join(dirPath, "output");

describe(`${DocxFileLoader.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocxFileLoader.name} successfully`, () => {
            const instance = new DocxFileLoader("");
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocxFileLoader);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocxFileLoader.name} successfully and return valid IDocxFile instance`, async () => {
            const instance = new DocxFileLoader(join(inputPath, "hello-world.docx"));
            const executeResult = await instance.execute();
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const docxFileInstance = executeResult.unwrap();
            expect(docxFileInstance).not.toBeUndefined();
            expect(docxFileInstance).not.toBeNull();
            expect(docxFileInstance.document).not.toBeUndefined();
            expect(docxFileInstance.document).not.toBeNull();
            expect(docxFileInstance.endnotes).not.toBeUndefined();
            expect(docxFileInstance.endnotes).not.toBeNull();
            expect(docxFileInstance.footnotes).not.toBeUndefined();
            expect(docxFileInstance.footnotes).not.toBeNull();
            expect(docxFileInstance.images).not.toBeUndefined();
            expect(docxFileInstance.images).not.toBeNull();
            expect(docxFileInstance.numberingSchemes).not.toBeUndefined();
            expect(docxFileInstance.numberingSchemes).not.toBeNull();
            expect(docxFileInstance.styles).not.toBeUndefined();
            expect(docxFileInstance.styles).not.toBeNull();
        });
    });
});