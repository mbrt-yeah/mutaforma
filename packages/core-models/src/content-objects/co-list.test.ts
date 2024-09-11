import { describe, expect, it } from "@jest/globals";

import { CoList } from "./co-list.js";

describe(`${CoList.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoList.name} successfully`, () => {
            const instance = new CoList();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoList);
            expect(instance.nodeName).toBe(CoList.name);
        });
    });
});