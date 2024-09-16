import { CoBody, CoParagraph } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";

import { CoBodyConverter } from "./co-body-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

const config = DocxToHtmlConfigDefault;
const registry = new CoConverterRegistry(config);

describe(`${CoBodyConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoBodyConverter.name}`, () => {
            const instance = new CoBodyConverter(config, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoBodyConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert ${CoBody.name} node to "<body></body>"`, async () => {
            const coBodyNode = new CoBody();
            const converter = new CoBodyConverter(config, registry);
            const converterResult = await converter.execute(coBodyNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<body></body>");
        });
        it(`should convert ${CoBody.name} node to "<body><p></p></body>"`, async () => {
            const coBodyNode = new CoBody();
            const coParaNode = new CoParagraph();
            coBodyNode.addChildNodes(coParaNode);

            const converter = new CoBodyConverter(config, registry);
            const converterResult = await converter.execute(coBodyNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<body><p></p></body>");
        });
    });
});