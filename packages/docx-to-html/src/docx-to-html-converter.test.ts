import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import { describe, expect, it } from "@jest/globals";
import { join, resolve } from "node:path";

import { DocxToHtmlConverter } from "./docx-to-html-converter.js";

const dirPath = resolve(__dirname, "../../../.test");
const inputPath = join(dirPath, "input");
const outputPath = join(dirPath, "output");

describe(`${DocxToHtmlConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocxToHtmlConverter.name} successfully`, () => {
            const instance = new DocxToHtmlConverter();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocxToHtmlConverter);
        });
        it(`should instantiate ${DocxToHtmlConverter.name} with custom config successfully`, () => {
            const instance = new DocxToHtmlConverter({
                config: {
                    endnotesWrapper: {
                        enabled: false,
                        element: {
                            attrs: {
                                "class": "test"
                            }
                        }
                    },
                }
            });
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocxToHtmlConverter);
            expect(instance.config.endnotesWrapper.enabled).toBe(false);
            expect(instance.config.endnotesWrapper.element.attrs).toStrictEqual({ "class": "test" });
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocxToHtmlConverter.name} successfully and return valid HTML string instance`, async () => {
            const instance = new DocxToHtmlConverter({
                outputPath,
                config: DocxToHtmlConfigDefault
            });

            const executeResult = await instance.execute(join(inputPath, "images.docx"));
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);
        });
    });
});