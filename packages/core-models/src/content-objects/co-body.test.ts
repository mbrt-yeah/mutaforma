import { describe, expect, it } from "@jest/globals";

import { CoBody } from "./co-body.js";

describe(`${CoBody.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoBody.name} successfully`, () => {
            const instance = new CoBody();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoBody);
            expect(instance.nodeName).toBe(CoBody.name);
        });
    });
});