import { Config, CoBreak, CoParagraph, CoText, CoTextRun, StyleMapping } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";

import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoParagraphConverter } from "./co-paragraph-converter.js";

const config = new Config();
const registry = new CoConverterRegistry(config);

describe(`${CoParagraphConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoParagraphConverter.name}`, () => {
            const instance = new CoParagraphConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoParagraphConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoParagraph.name} node to an empty string if it contains only a single ${CoTextRun.name} which in turn contains a single ${CoBreak.name} node`, async () => {
            const coParagraphNode = new CoParagraph();
            const coTextRunNode = new CoTextRun();
            const coBreakNode = new CoBreak("page");

            coTextRunNode.addChildNodes(coBreakNode);
            coParagraphNode.addChildNodes(coTextRunNode);

            const converter = new CoParagraphConverter(config, registry);
            const converterResult = await converter.execute(coParagraphNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("");
        });
        it(`should convert ${CoParagraph.name} node to "" if it contains no child nodes`, async () => {
            const coParagraphNode = new CoParagraph();
            const converter = new CoParagraphConverter(config, registry);
            const converterResult = await converter.execute(coParagraphNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("");
        });
        it(`should convert ${CoParagraph.name} node to "<div class="textbox">Hello World</div>" when there is an associated mapping`, async () => {
            const coParagraphNode = new CoParagraph();
            coParagraphNode.mapping = new StyleMapping({
                element: {
                    name: "div",
                    attrs: {
                        "class": "textbox"
                    }
                }
            });
            const coTextRunNode = new CoTextRun();
            const coTextNode = new CoText("Hello World");

            coTextRunNode.addChildNodes(coTextNode)
            coParagraphNode.addChildNodes(coTextRunNode);

            const converter = new CoParagraphConverter(config, registry);
            const converterResult = await converter.execute(coParagraphNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe(`<div class="textbox">Hello World</div>`);
        });
        it(`should convert ${CoParagraph.name} node to "<p>Hello World</p>"`, async () => {
            const coParagraphNode = new CoParagraph();
            const coTextRunNode = new CoTextRun();
            const coTextNode = new CoText("Hello World");

            coTextRunNode.addChildNodes(coTextNode)
            coParagraphNode.addChildNodes(coTextRunNode);

            const converter = new CoParagraphConverter(config, registry);
            const converterResult = await converter.execute(coParagraphNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<p>Hello World</p>");
        });
    });
});