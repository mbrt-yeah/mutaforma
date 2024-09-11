import { describe, expect, it } from "@jest/globals";

import { CoParagraph } from "./co-paragraph.js";

describe(`${CoParagraph.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoParagraph.name} successfully`, () => {
            const instance = new CoParagraph();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoParagraph);
            expect(instance.nodeName).toBe(CoParagraph.name);
        });
    });
});