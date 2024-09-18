import { describe, expect, it } from "@jest/globals";

import { DocContentHandlerDocxStyles } from "./doc-content-handler-docx-styles.js";
import { StylesXml } from "./_test/styles-xml.js";

describe(`${DocContentHandlerDocxStyles.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocContentHandlerDocxStyles.name} successfully`, () => {
            const instance = new DocContentHandlerDocxStyles();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocContentHandlerDocxStyles);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocContentHandlerDocxStyles.name} successfully and return valid result`, async () => {
            const instance = new DocContentHandlerDocxStyles();
            const executeResult = await instance.execute(StylesXml);
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const styles = executeResult.unwrap();
            expect(styles).not.toBeUndefined();
            expect(styles).not.toBeNull();
            expect(Object.keys(styles).length).toBe(52);
        });
    });
});