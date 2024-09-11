import { describe, expect, it } from "@jest/globals";

import { CoDocument } from "./co-document.js";

describe(`${CoDocument.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoDocument.name} successfully`, () => {
            const instance = new CoDocument();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoDocument);
            expect(instance.nodeName).toBe(CoDocument.name);
        });
    });
});