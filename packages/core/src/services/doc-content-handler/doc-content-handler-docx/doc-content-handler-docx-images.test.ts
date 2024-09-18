import { describe, expect, it } from "@jest/globals";

import { DocContentHandlerDocxImages } from "./doc-content-handler-docx-images.js";
import { DocumentXmlRels } from "./_test/document-xml-rels.js";

describe(`${DocContentHandlerDocxImages.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DocContentHandlerDocxImages.name} successfully`, () => {
            const instance = new DocContentHandlerDocxImages();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DocContentHandlerDocxImages);
        });
    });
    describe("#execute", () => {
        it(`should execute ${DocContentHandlerDocxImages.name} successfully and return valid result`, async () => {
            const instance = new DocContentHandlerDocxImages();
            const executeResult = await instance.execute(DocumentXmlRels, {});
            expect(executeResult).not.toBeUndefined();
            expect(executeResult).not.toBeNull();
            expect(executeResult.isErr()).toBe(false);

            const images = executeResult.unwrap();
            expect(images).not.toBeUndefined();
            expect(images).not.toBeNull();
            expect(Object.keys(images).length).toBe(3);
        });
    });
});