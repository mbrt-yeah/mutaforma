import { CoList, CoListItem } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";

import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoListConverter } from "./co-list-converter.js";

const config = DocxToHtmlConfigDefault;
const registry = new CoConverterRegistry(config);

describe(`${CoListConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoListConverter.name}`, () => {
            const instance = new CoListConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoListConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoList.name} node to "<ul></ul>"`, async () => {
            const coListNode = new CoList();
            const converter = new CoListConverter(config, registry);
            const converterResult = await converter.execute(coListNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<ul></ul>");
        });
        it(`should convert ${CoList.name} node to "<ul><li></li><li></li></ul>"`, async () => {
            const coListNode = new CoList();
            const coListItemNode1 = new CoListItem();
            const coListItemNode2 = new CoListItem();

            coListNode.addChildNodes([coListItemNode1, coListItemNode2]);

            const converter = new CoListConverter(config, registry);
            const converterResult = await converter.execute(coListNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<ul><li></li><li></li></ul>");
        });
    });
});