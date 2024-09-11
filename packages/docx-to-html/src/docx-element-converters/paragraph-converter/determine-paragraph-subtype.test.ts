import { CoHeading, CoListItem, CoParagraph } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";

import { determineParagraphSubType } from "./determine-paragraph-subtype.js";

describe(`${determineParagraphSubType.name}`, () => {
    it(`should determine the paragraph to be a ${CoListItem.name} with indentation level 1`, async () => {
        const result = determineParagraphSubType("ListItem", "1");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoListItem);
        expect(result.indentationLevel).toBe(1);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 1`, async () => {
        const result = determineParagraphSubType("Heading1");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(0);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 2`, async () => {
        const result = determineParagraphSubType("Heading2");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(1);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 3`, async () => {
        const result = determineParagraphSubType("Heading3");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(2);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 4`, async () => {
        const result = determineParagraphSubType("Heading4");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(3);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 5`, async () => {
        const result = determineParagraphSubType("Heading5");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(4);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 6`, async () => {
        const result = determineParagraphSubType("Heading6");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(5);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 7`, async () => {
        const result = determineParagraphSubType("Heading7");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(6);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 8`, async () => {
        const result = determineParagraphSubType("Heading8");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(7);
    });
    it(`should determine the paragraph to be a ${CoHeading.name} of level 9`, async () => {
        const result = determineParagraphSubType("Heading9");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoHeading);
        expect(result.indentationLevel).toBe(8);
    });
    it(`should determine the paragraph to be a ${CoListItem.name} of level 1`, async () => {
        const result = determineParagraphSubType("SomeStyleName", "0");
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoListItem);
        expect(result.indentationLevel).toBe(0);
    });
    it(`should determine the paragraph to be a ${CoParagraph.name}`, async () => {
        const result = determineParagraphSubType();
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).toBeInstanceOf(CoParagraph);
        expect(result.indentationLevel).toBe(undefined);
    });
});