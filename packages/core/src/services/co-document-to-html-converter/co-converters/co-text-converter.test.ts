import { Config, ConfigHtmlEntities, CoText } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";

import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoTextConverter } from "./co-text-converter.js";

const config = new Config();
const registry = new CoConverterRegistry(config);

describe(`${CoTextConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoTextConverter.name}`, () => {
            const instance = new CoTextConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoTextConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoText.name} node to ""`, async () => {
            const coTextRunNode = new CoText();
            const converter = new CoTextConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("");
        });
        it(`should convert ${CoText.name} node to "Hello World"`, async () => {
            const coTextNode = new CoText("Hello World");
            const converter = new CoTextConverter(config, registry);
            const converterResult = await converter.execute(coTextNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("Hello World");
        });
        it(`should convert ${CoText.name} node with contents "äöü" to "äöü" when config.outHtmlEntities.enabled = false`, async () => {
            const configNew = new Config({
                outHtmlEntities: new ConfigHtmlEntities({
                    enabled: false,
                }), 
            });
            const coTextNode = new CoText("äöü");
            const converter = new CoTextConverter(configNew, registry);
            const converterResult = await converter.execute(coTextNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("äöü");
        });
        it(`should convert ${CoText.name} node with contents "äöü" to "&auml;&ouml;&uuml;" when config.outHtmlEntities.enabled = true`, async () => {
            const configNew = new Config({
                outHtmlEntities: new ConfigHtmlEntities({
                    enabled: true,
                    options: {
                        allowUnsafeSymbols: false,
                        decimal: false,
                        encodeEverything: false,
                        strict: false,
                        useNamedReferences: true,
                    }
                })
            });
            const coTextNode = new CoText("äöü");
            const converter = new CoTextConverter(configNew, registry);
            const converterResult = await converter.execute(coTextNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("&auml;&ouml;&uuml;");
        });
    });
});