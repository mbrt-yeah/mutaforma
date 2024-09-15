import { describe, expect, it } from "@jest/globals";

import { CoTextRun } from "./co-text-run.js";

describe(`${CoTextRun.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoTextRun.name} successfully`, () => {
            const instance = new CoTextRun();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoTextRun);
            expect(instance.nodeName).toBe(CoTextRun.name);
        });
    });
});