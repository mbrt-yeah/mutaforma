import { describe, expect, it } from "@jest/globals";

import { DocContentHandlerDocxNumberings } from "./doc-content-handler-docx-numberings.js";
import { NumberingXml } from "./_test/numbering-xml.js";

describe(`${DocContentHandlerDocxNumberings.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocContentHandlerDocxNumberings.name} successfully`, () => {
            const instance = new DocContentHandlerDocxNumberings();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocContentHandlerDocxNumberings);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocContentHandlerDocxNumberings.name} successfully and return valid result`, async () => {
            const instance = new DocContentHandlerDocxNumberings();
            const executeResult = await instance.execute(NumberingXml);
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const numberings = executeResult.unwrap();
            expect(numberings).not.toBeUndefined();
            expect(numberings).not.toBeNull();
            expect(Object.keys(numberings).length).toBe(6);
        });
    });
});