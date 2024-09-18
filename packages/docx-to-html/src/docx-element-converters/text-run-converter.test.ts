import { CoText, CoTextRun, Doc } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { TextRunConverter } from "./text-run-converter.js";

const config = DocxToHtmlConfigDefault;
const doc = new Doc();
const registry = new DocxElementConverterRegistry(config, doc);

describe(`${TextRunConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${TextRunConverter.name}`, () => {
            const instance = new TextRunConverter(config, doc, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(TextRunConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:r element to ${CoTextRun.name} node`, async () => {
            const $elem = cheerio.load(`<w:r></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(0);
        });
        it(`should convert w:r element to ${CoTextRun.name} node containing one ${CoText.name} node`, async () => {
            const $elem = cheerio.load(`<w:r><w:t>Hello World</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);

            const text = textRun.childNodes[0] as CoText;

            expect(text.value).toBe("Hello World");
        });
        it(`should convert w:r element with bold text to ${CoTextRun.name} node with isBold set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:b/><w:bCs/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(true);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
        it(`should convert w:r element with italic text to ${CoTextRun.name} node with isItalic set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:i/><w:iCs/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(true);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
        it(`should convert w:r element with underlined text to ${CoTextRun.name} node with isUnderline set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:u w:val="single"/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(true);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
        it(`should convert w:r element with striked-through text to ${CoTextRun.name} node with isStrikethrough set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:strike/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(true);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
        it(`should convert w:r element with subscript text to ${CoTextRun.name} node with isSubscript set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:vertAlign w:val="subscript"/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(true);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
        it(`should convert w:r element with superscript text to ${CoTextRun.name} node with isSuperscript set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(false);
            expect(textRun.isItalic).toBe(false);
            expect(textRun.isUnderline).toBe(false);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(true);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
        it(`should convert w:r element with bold, italic and underlined text to ${CoTextRun.name} node with isBold, isItalic and isUnderline set to true`, async () => {
            const $elem = cheerio.load(`<w:r w:rsidRPr="00AB1FD6"><w:rPr><w:b/><w:bCs/><w:i/><w:iCs/><w:u w:val="single"/><w:lang w:val="it-IT"/></w:rPr><w:t>porttitor</w:t></w:r>`, { xmlMode: true }, false);
            const instance = new TextRunConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const textRun = executionResult.unwrap();

            expect(textRun).not.toBeNull();
            expect(textRun).not.toBeUndefined();
            expect(textRun).toBeInstanceOf(CoTextRun);
            expect(textRun.isBold).toBe(true);
            expect(textRun.isItalic).toBe(true);
            expect(textRun.isUnderline).toBe(true);
            expect(textRun.isStrikethrough).toBe(false);
            expect(textRun.isSubscript).toBe(false);
            expect(textRun.isSuperscript).toBe(false);
            expect(textRun.childNodesTotal).toBe(1);
            expect(textRun.childNodes[0]).toBeInstanceOf(CoText);
        });
    });
});