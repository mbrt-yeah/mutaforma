import { describe, expect, it } from "@jest/globals";

import { Config, CoBody, CoDocument } from "@mtfm/core-models";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoDocumentConverter } from "./co-document-converter.js";

const config = new Config();
const registry = new CoConverterRegistry(config);

describe(`${CoDocumentConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoDocumentConverter.name}`, () => {
            const instance = new CoDocumentConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoDocumentConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoDocument.name} node to "<!DOCTYPE html><html></html>"`, async () => {
            const coDocumentNode = new CoDocument();
            const converter = new CoDocumentConverter(config, registry);
            const converterResult = await converter.execute(coDocumentNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<!DOCTYPE html><html></html>");
        });
        it(`should convert ${CoDocument.name} node to "<!DOCTYPE html><html><body></body></html>"`, async () => {
            const coDocumentNode = new CoDocument();
            const coBodyNode = new CoBody();
            coDocumentNode.addChildNodes(coBodyNode);

            const converter = new CoDocumentConverter(config, registry);
            const converterResult = await converter.execute(coDocumentNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<!DOCTYPE html><html><body></body></html>");
        });
    });
});