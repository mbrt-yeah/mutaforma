import { CoTable, CoTableRow, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { TableConverter } from "./table-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${TableConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${TableConverter.name}`, () => {
            const instance = new TableConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(TableConverter);
        });
    });

    describe("#execute", () => {
        it(`should convert w:tbl element to ${CoTable.name} node`, async () => {
            const xml = `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid" /><w:tblW w:w="0" w:type="auto" /><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1" /></w:tblPr><w:tblGrid><w:gridCol w:w="1812" /><w:gridCol w:w="1812" /><w:gridCol w:w="1812" /><w:gridCol w:w="1813" /><w:gridCol w:w="1813" /></w:tblGrid><w:tr w:rsidR="00ED1CC5" w14:paraId="2E25A1F1" w14:textId="77777777" w:rsidTr="00F56586"></w:tr><w:tr w:rsidR="00ED1CC5" w14:paraId="5E44FA7A" w14:textId="77777777" w:rsidTr="00F56586"></w:tr><w:tr w:rsidR="00ED1CC5" w14:paraId="52E1E698" w14:textId="77777777" w:rsidTr="003B40FB"></w:tr><w:tr w:rsidR="00ED1CC5" w14:paraId="2CC369B5" w14:textId="77777777" w:rsidTr="00F56586"></w:tr><w:tr w:rsidR="00BB0E92" w14:paraId="508659FA" w14:textId="77777777" w:rsidTr="00960C6B"></w:tr><w:tr w:rsidR="00BB0E92" w14:paraId="3ACD8AA3" w14:textId="77777777" w:rsidTr="00960C6B"></w:tr><w:tr w:rsidR="00BB0E92" w14:paraId="2D370CA9" w14:textId="77777777" w:rsidTr="00960C6B"></w:tr></w:tbl>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new TableConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const table = executionResult.unwrap();

            expect(table).not.toBeNull();
            expect(table).not.toBeUndefined();
            expect(table).toBeInstanceOf(CoTable);
            expect(table.columnsTotal).toBe(5);
            expect(table.childNodesTotal).toBe(7);

            for (const childNode of table.childNodes)
                expect(childNode).toBeInstanceOf(CoTableRow);
        });
    });
});