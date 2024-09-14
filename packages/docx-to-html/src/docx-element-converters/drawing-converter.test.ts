import { Asset, CoImage, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { DrawingConverter } from "./drawing-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
docxFile.images["rId5"] = new Asset({
    id: "rId5",
    data: "123",
    name: "image-1",
});
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${DrawingConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${DrawingConverter.name}`, () => {
            const instance = new DrawingConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(DrawingConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:drawing element representing an embedded image to ${CoImage.name} node`, async () => {
            const xml = `<w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="587C4956" wp14:editId="56DBCFC8"><wp:extent cx="5760720" cy="1980565" /><wp:effectExtent l="0" t="0" r="0" b="635" /><wp:docPr id="846457507" name="Picture 1" descr="Super yeah" /><wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1" /></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="846457507" name="Picture 1" descr="Super yeah" /><pic:cNvPicPr /></pic:nvPicPr><pic:blipFill><a:blip r:embed="rId5"><a:extLst><a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}"><a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0" /></a:ext></a:extLst></a:blip><a:stretch><a:fillRect /></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0" /><a:ext cx="5760720" cy="1980565" /></a:xfrm><a:prstGeom prst="rect"><a:avLst /></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new DrawingConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoImage);
            expect(result.childNodesTotal).toBe(0);
            expect(result.width).toBe(605);
            expect(result.height).toBe(208);
            expect(result.id).toBe("rId5");
            expect(result.data).toBe("123");
        });
    });
    describe("#execute", () => {
        it(`should convert w:drawing element representing a referenced image to ${CoImage.name} node`, async () => {
            const xml = `<w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" wp14:anchorId="583A8BC7" wp14:editId="072A003B"><wp:extent cx="4467225" cy="3219450" /><wp:effectExtent l="0" t="0" r="9525" b="0" /><wp:docPr id="792775376" name="Screenshot 2024-06-17 094104.png" descr="Alt text figure 2" /><wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1" /></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="792775376" name="Screenshot 2024-06-17 094104.png" descr="Alt text figure 2" /><pic:cNvPicPr /></pic:nvPicPr><pic:blipFill><a:blip r:link="rId9" /><a:stretch><a:fillRect /></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0" /><a:ext cx="4467225" cy="3219450" /></a:xfrm><a:prstGeom prst="rect"><a:avLst /></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new DrawingConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const result = executionResult.unwrap();

            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
            expect(result).toBeInstanceOf(CoImage);
            expect(result.childNodesTotal).toBe(0);
            expect(result.width).toBe(469);
            expect(result.height).toBe(338);
            expect(result.id).toBe("rId9");
            expect(result.data).toBe("");
        });
    });
});