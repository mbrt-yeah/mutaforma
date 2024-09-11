import { describe, expect, it } from "@jest/globals";

import { CoListItem } from "./co-list-item.js";

describe(`${CoListItem.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoListItem.name} successfully`, () => {
            const instance = new CoListItem();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoListItem);
            expect(instance.nodeName).toBe(CoListItem.name);
        });
    });
});