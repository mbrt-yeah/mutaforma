import { describe, expect, it } from "@jest/globals";

import { CoImage } from "./co-image.js";

describe(`${CoImage.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoImage.name} successfully`, () => {
            const instance = new CoImage();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoImage);
            expect(instance.nodeName).toBe(CoImage.name);
        });
    });
});