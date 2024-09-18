import { describe, expect, it } from "@jest/globals";
import { join, resolve } from "node:path";

import { DocxLoader } from "./docx-loader.js";

const dirPath = resolve(__dirname, "../../../../../.test");
const inputPath = join(dirPath, "input");
const outputPath = join(dirPath, "output");

describe(`${DocxLoader.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocxLoader.name} successfully`, () => {
            const instance = new DocxLoader();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocxLoader);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocxLoader.name} successfully and return valid result`, async () => {
            const instance = new DocxLoader();
            const executeResult = await instance.execute(join(inputPath, "images.docx"));
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const docxFileInstance = executeResult.unwrap();
            expect(docxFileInstance).not.toBeUndefined();
            expect(docxFileInstance).not.toBeNull();
            expect(docxFileInstance.contents).not.toBeUndefined();
            expect(docxFileInstance.contents).not.toBeNull();
            expect(docxFileInstance.endnotes).not.toBeUndefined();
            expect(docxFileInstance.endnotes).not.toBeNull();
            expect(docxFileInstance.footnotes).not.toBeUndefined();
            expect(docxFileInstance.footnotes).not.toBeNull();
            expect(docxFileInstance.images).not.toBeUndefined();
            expect(docxFileInstance.images).not.toBeNull();
            expect(docxFileInstance.numberings).not.toBeUndefined();
            expect(docxFileInstance.numberings).not.toBeNull();
            expect(docxFileInstance.styles).not.toBeUndefined();
            expect(docxFileInstance.styles).not.toBeNull();
        });
    });
});