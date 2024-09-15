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
        it(`should convert ${CoTextRun.name} node with isBold=true to "<strong>Hello World</strong>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isBold: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<strong>Hello World</strong>");
        });
        it(`should convert ${CoTextRun.name} node with isItalic=true to "<em>Hello World</em>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isItalic: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<em>Hello World</em>");
        });
        it(`should convert ${CoTextRun.name} node with isStrikethrough=true to "<s>Hello World</s>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isStrikethrough: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<s>Hello World</s>");
        });
        it(`should convert ${CoTextRun.name} node with isUnderline=true to "<u>Hello World</u>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isUnderline: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<u>Hello World</u>");
        });
        it(`should convert ${CoTextRun.name} node with isSubscript=true to "<sub>Hello World</sub>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isSubscript: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<sub>Hello World</sub>");
        });
        it(`should convert ${CoTextRun.name} node with isSuperscript=true to "<sup>Hello World</sup>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isSuperscript: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<sup>Hello World</sup>");
        });
        it(`should convert ${CoTextRun.name} node with isBold=true, isItalic=true, isUnderline==true, isStrikethrough=true, isSubscript=true to "<sub><s><u><em><strong>Hello World</strong></em></u></s></sub>"`, async () => {
            const coTextRunNode = new CoTextRun({
                isBold: true,
                isItalic: true,
                isStrikethrough: true,
                isUnderline: true,
                isSubscript: true,
            });
            const coTextNode = new CoText("Hello World");
            coTextRunNode.addChildNodes(coTextNode);

            const converter = new CoTextRunConverter(config, registry);
            const converterResult = await converter.execute(coTextRunNode);

            expect(converterResult.isOk()).toBe(true);

            const result = converterResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBe("<sub><s><u><em><strong>Hello World</strong></em></u></s></sub>");
        });
    });
});