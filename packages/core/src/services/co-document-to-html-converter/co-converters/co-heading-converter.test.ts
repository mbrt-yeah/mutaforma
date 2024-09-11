import { Config, CoHeading, CoText, CoTextRun, StyleMapping } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";

import { CoHeadingConverter } from "./co-heading-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

const config = new Config();
const registry = new CoConverterRegistry(config);

describe(`${CoHeadingConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoHeadingConverter.name}`, () => {
            const instance = new CoHeadingConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoHeadingConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoHeading.name} node to "<h1></h1>" when there is no associated mapping and no level`, async () => {
            const coHeadingNode = new CoHeading();
            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<h1></h1>");
        });
        it(`should convert ${CoHeading.name} node to "<h1></h1>" when heading has level 0`, async () => {
            const coHeadingNode = new CoHeading();
            coHeadingNode.indentationLevel = 0;
            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<h1></h1>");
        });
        it(`should convert ${CoHeading.name} node to "<h2></h2>" when heading has level 1`, async () => {
            const coHeadingNode = new CoHeading();
            coHeadingNode.indentationLevel = 1;
            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<h2></h2>");
        });
        it(`should convert ${CoHeading.name} node to "<h5></h5>" when heading has level 4`, async () => {
            const coHeadingNode = new CoHeading();
            coHeadingNode.indentationLevel = 4;
            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<h5></h5>");
        });
        it(`should convert ${CoHeading.name} node to "<h1 class="heading-1"></h1>" when there is an associated mapping`, async () => {
            const coHeadingNode = new CoHeading();
            coHeadingNode.mapping = new StyleMapping({
                element: {
                    name: "h1",
                    attrs: {
                        "class": "heading-1"
                    }
                }
            })
            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe(`<h1 class="heading-1"></h1>`);
        });
        it(`should convert ${CoHeading.name} node to "<h2 class="heading-2"></h2>" when there is an associated mapping`, async () => {
            const coHeadingNode = new CoHeading();
            coHeadingNode.mapping = new StyleMapping({
                element: {
                    name: "h2",
                    attrs: {
                        "class": "heading-2"
                    }
                }
            })
            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe(`<h2 class="heading-2"></h2>`);
        });
        it(`should convert ${CoHeading.name} node to "<h1>Hello World</h1>"`, async () => {
            const coHeadingNode = new CoHeading();
            const coTextRunNode = new CoTextRun();
            const coTextNode = new CoText("Hello World");

            coTextRunNode.addChildNodes(coTextNode)
            coHeadingNode.addChildNodes(coTextRunNode);

            const converter = new CoHeadingConverter(config, registry);
            const converterResult = await converter.execute(coHeadingNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<h1>Hello World</h1>");
        });
    });
});