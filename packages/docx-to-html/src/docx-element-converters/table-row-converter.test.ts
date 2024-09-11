import { CoTableCell, CoTableRow, DocxFile } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { TableRowConverter } from "./table-row-converter.js";

const config = DocxToHtmlConfigDefault;
const docxFile = new DocxFile();
const registry = new DocxElementConverterRegistry(config, docxFile);

describe(`${TableRowConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${TableRowConverter.name}`, () => {
            const instance = new TableRowConverter(config, docxFile, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(TableRowConverter);
        });
    });

    describe("#execute", () => {
        it(`should convert w:tc element to ${CoTableRow.name} node`, async () => {
            const $elem = cheerio.load(`<w:tr w:rsidR="00ED1CC5" w14:paraId="52E1E698" w14:textId="77777777" w:rsidTr="003B40FB"><w:tc><w:tcPr><w:tcW w:w="3624" w:type="dxa" /><w:gridSpan w:val="2" /><w:vMerge /></w:tcPr></w:tc><w:tc><w:tcPr><w:tcW w:w="3625" w:type="dxa" /><w:gridSpan w:val="2" /></w:tcPr></w:tc><w:tc><w:tcPr><w:tcW w:w="1813" w:type="dxa" /><w:vMerge /></w:tcPr></w:tc></w:tr>`, null, false);
            const instance = new TableRowConverter(config, docxFile, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const tableRow = executionResult.unwrap();

            expect(tableRow).not.toBeNull();
            expect(tableRow).not.toBeUndefined();
            expect(tableRow).toBeInstanceOf(CoTableRow);
            expect(tableRow.childNodesTotal).toBe(3);

            for (const childNode of tableRow.childNodes)
                expect(childNode).toBeInstanceOf(CoTableCell);
        });
    });
});

