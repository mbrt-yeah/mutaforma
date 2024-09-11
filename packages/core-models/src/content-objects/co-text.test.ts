import { describe, expect, it } from "@jest/globals";

import { CoText } from "./co-text.js";

describe(`${CoText.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoText.name} successfully`, () => {
            const instance = new CoText();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoText);
            expect(instance.nodeName).toBe(CoText.name);
        });
    });
});