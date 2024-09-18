import { describe, expect, it } from "@jest/globals";
import { Doc, CoTableCell, CoParagraph, CoTextRun, CoText } from "@mtfm/core-models";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";
import { TableCellConverter } from "./table-cell-converter.js";

const config = DocxToHtmlConfigDefault;
const doc = new Doc();
const registry = new DocxElementConverterRegistry(config, doc);

describe(`${TableCellConverter.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${TableCellConverter.name}`, () => {
            const instance = new TableCellConverter(config, doc, registry);
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(TableCellConverter);
        });
    });
    describe("#execute", () => {
        it(`should convert w:tc element to ${CoTableCell.name} node`, async () => {
            const $elem = cheerio.load(`<w:tc><w:tcPr><w:tcW w:w="3624" w:type="dxa" /></w:tcPr></w:tc>`, { xmlMode: true }, false);
            const instance = new TableCellConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const tableCell = executionResult.unwrap();

            expect(tableCell).not.toBeNull();
            expect(tableCell).not.toBeUndefined();
            expect(tableCell).toBeInstanceOf(CoTableCell);
            expect(tableCell.colSpan).toBe(0);
            expect(tableCell.rowSpan).toBe(0);
            expect(tableCell.restart).toBe(false);
            expect(tableCell.merge).toBe(false);
            expect(tableCell.childNodesTotal).toBe(0);
        });
        it(`should convert w:tc element with <w:gridSpan w:val="2" /> to ${CoTableCell.name} node`, async () => {
            const $elem = cheerio.load(`<w:tc><w:tcPr><w:tcW w:w="3624" w:type="dxa" /><w:gridSpan w:val="2" /></w:tcPr></w:tc>`, { xmlMode: true }, false);
            const instance = new TableCellConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const tableCell = executionResult.unwrap();

            expect(tableCell).not.toBeNull();
            expect(tableCell).not.toBeUndefined();
            expect(tableCell).toBeInstanceOf(CoTableCell);
            expect(tableCell.colSpan).toBe(2);
            expect(tableCell.rowSpan).toBe(0);
            expect(tableCell.restart).toBe(false);
            expect(tableCell.merge).toBe(false);
            expect(tableCell.childNodesTotal).toBe(0);
        });

        it(`should convert w:tc element with <w:gridSpan w:val="2" /> and <w:vMerge /> to ${CoTableCell.name} node`, async () => {
            const $elem = cheerio.load(`<w:tc><w:tcPr><w:tcW w:w="3624" w:type="dxa" /><w:gridSpan w:val="2" /><w:vMerge /></w:tcPr></w:tc>`, { xmlMode: true }, false);
            const instance = new TableCellConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const tableCell = executionResult.unwrap();

            expect(tableCell).not.toBeNull();
            expect(tableCell).not.toBeUndefined();
            expect(tableCell).toBeInstanceOf(CoTableCell);
            expect(tableCell.colSpan).toBe(2);
            expect(tableCell.rowSpan).toBe(0);
            expect(tableCell.restart).toBe(false);
            expect(tableCell.merge).toBe(true);
            expect(tableCell.childNodesTotal).toBe(0);
        });

        it(`should convert w:tc element with <w:gridSpan w:val="2" /> and <w:vMerge w:val="restart" /> to ${CoTableCell.name} node`, async () => {
            const $elem = cheerio.load(`<w:tc><w:tcPr><w:tcW w:w="3624" w:type="dxa" /><w:gridSpan w:val="2" /><w:vMerge w:val="restart" /></w:tcPr></w:tc>`, { xmlMode: true }, false);
            const instance = new TableCellConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const tableCell = executionResult.unwrap();

            expect(tableCell).not.toBeNull();
            expect(tableCell).not.toBeUndefined();
            expect(tableCell).toBeInstanceOf(CoTableCell);
            expect(tableCell.colSpan).toBe(2);
            expect(tableCell.rowSpan).toBe(0);
            expect(tableCell.restart).toBe(true);
            expect(tableCell.merge).toBe(false);
            expect(tableCell.childNodesTotal).toBe(0);
        });

        it(`should convert w:tc element to ${CoTableCell.name} node`, async () => {
            const xml = `<w:tc><w:tcPr><w:tcW w:w="1812" w:type="dxa" /></w:tcPr><w:p w14:paraId="0C5894A7" w14:textId="7518E35B" w:rsidR="00BB0E92" w:rsidRDefault="00BB0E92" w:rsidP="00F56586"><w:pPr><w:rPr><w:lang w:val="en-US" /></w:rPr></w:pPr><w:r><w:rPr><w:lang w:val="en-US" /></w:rPr><w:t>Table Cell 20</w:t></w:r></w:p></w:tc>`;
            const $elem = cheerio.load(xml, { xmlMode: true }, false);
            const instance = new TableCellConverter(config, doc, registry);
            const executionResult = await instance.execute($elem);

            expect(executionResult.isOk()).toBe(true);

            const tableCell = executionResult.unwrap();

            expect(tableCell).not.toBeNull();
            expect(tableCell).not.toBeUndefined();
            expect(tableCell).toBeInstanceOf(CoTableCell);
            expect(tableCell.colSpan).toBe(0);
            expect(tableCell.rowSpan).toBe(0);
            expect(tableCell.restart).toBe(false);
            expect(tableCell.merge).toBe(false);
            expect(tableCell.childNodesTotal).toBe(1);
            expect(tableCell.childNodes[0]).toBeInstanceOf(CoParagraph);
            expect(tableCell.childNodes[0].childNodesTotal).toBe(1);
            expect(tableCell.childNodes[0].childNodes[0]).toBeInstanceOf(CoTextRun);
            expect(tableCell.childNodes[0].childNodes[0].childNodesTotal).toBe(1);
            expect(tableCell.childNodes[0].childNodes[0].childNodes[0]).toBeInstanceOf(CoText);
            expect(tableCell.childNodes[0].childNodes[0].childNodes[0].childNodesTotal).toBe(0);

            const coText = tableCell.childNodes[0].childNodes[0].childNodes[0] as CoText

            expect(coText.value).toBe("Table Cell 20");
        });
    });
});