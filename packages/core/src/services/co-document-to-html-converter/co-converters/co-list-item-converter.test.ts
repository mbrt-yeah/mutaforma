import { CoListItem, CoText, CoTextRun, StyleMapping } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";

import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoListItemConverter } from "./co-list-item-converter.js";

const config = DocxToHtmlConfigDefault;
const registry = new CoConverterRegistry(config);

describe(`${CoListItemConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoListItemConverter.name}`, () => {
            const instance = new CoListItemConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoListItemConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoListItem.name} node to "<li></li>" when there is no associated mapping`, async () => {
            const coListItemNode = new CoListItem();
            const converter = new CoListItemConverter(config, registry);
            const converterResult = await converter.execute(coListItemNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<li></li>");
        });
        it(`should convert ${CoListItem.name} node to "<p class="list-item"></p>" when there is an associated mapping`, async () => {
            const coListItemNode = new CoListItem();
            coListItemNode.mapping = new StyleMapping({
                element: {
                    name: "p",
                    attrs: {
                        "class": "list-item"
                    }
                }
            })
            const converter = new CoListItemConverter(config, registry);
            const converterResult = await converter.execute(coListItemNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe(`<p class="list-item"></p>`);
        });
        it(`should convert ${CoListItem.name} node to "<li>Hello World</li>"`, async () => {
            const coListItemNode = new CoListItem();
            const coTextRunNode = new CoTextRun();
            const coTextNode = new CoText("Hello World");

            coTextRunNode.addChildNodes(coTextNode)
            coListItemNode.addChildNodes(coTextRunNode);

            const converter = new CoListItemConverter(config, registry);
            const converterResult = await converter.execute(coListItemNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<li>Hello World</li>");
        });
    });
});