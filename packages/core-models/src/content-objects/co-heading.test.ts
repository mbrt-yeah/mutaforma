import { describe, expect, it } from "@jest/globals";

import { CoHeading } from "./co-heading.js";

describe(`${CoHeading.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoHeading.name} successfully`, () => {
            const instance = new CoHeading();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoHeading);
            expect(instance.nodeName).toBe(CoHeading.name);
        });
    });
});