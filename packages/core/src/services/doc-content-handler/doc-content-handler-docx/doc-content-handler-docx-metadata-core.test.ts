import { describe, expect, it } from "@jest/globals";

import { DocxContentHandlerDocxMetadataCore } from "./doc-content-handler-docx-metadata-core.js";
import { MetadataCoreXml } from "./_test/metadata-core-xml.js";

describe(`${DocxContentHandlerDocxMetadataCore.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocxContentHandlerDocxMetadataCore.name} successfully`, () => {
            const instance = new DocxContentHandlerDocxMetadataCore();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocxContentHandlerDocxMetadataCore);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocxContentHandlerDocxMetadataCore.name} successfully and return valid result`, async () => {
            const instance = new DocxContentHandlerDocxMetadataCore();
            const executeResult = await instance.execute(MetadataCoreXml);
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const metadataCore = executeResult.unwrap();
            expect(metadataCore).not.toBeUndefined();
            expect(metadataCore).not.toBeNull();
            expect(Object.keys(metadataCore).length).toBe(11);
        });
    });
});