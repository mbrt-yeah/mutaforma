import { Config, CoText, CoTextRun } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";

import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoTextRunConverter } from "./co-text-run-converter.js";

const config = new Config();
const registry = new CoConverterRegistry(config);

describe(`${CoTextRunConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoTextRunConverter.name}`, () => {
            const instance = new CoTextRunConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoTextRunConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoTextRun.name} node to ""`, async () => {
            const coTextRunNode = new CoTextRun();
            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("");
        });
        it(`should convert ${CoTextRun.name} node to "Hello World"`, async () => {
            const coTextRunNode = new CoTextRun();
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("Hello World");
        });
    });
});