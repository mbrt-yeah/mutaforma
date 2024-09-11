import { 
    CoTable,
    CoTableCell,
    IConfig,
    IDocxFile
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX table elements to their corresponding CoTable elements.
 *
 * @class TableConverter
 * @extends {ADocxElementConverter<CoTable>}
 */
export class TableConverter extends ADocxElementConverter<CoTable> {

    /**
     * Creates an instance of TableConverter.
     *
     * @param {IConfig} config - The configuration settings for the conversion process.
     * @param {IDocxFile} docxFile - The DOCX file to be converted.
     * @param {DocxElementConverterRegistry} elementConverterRegistry - The registry of element converters.
     */
    public constructor(
        config: IConfig,
        docxFile: IDocxFile,
        elementConverterRegistry: DocxElementConverterRegistry
    ) {
        super(config, docxFile, elementConverterRegistry);
    }

    /**
     * Asynchronously converts a DOCX table element to its corresponding CoTable element.
     *
     * @param {CheerioAPI} $elem - The DOCX table element to be converted.
     *
     * @returns {Promise<Result<CoTable, Error>>} - A promise that resolves to a result containing the converted CoTable element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoTable, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const $root = $elem(":root", $elem.html());
        const $wGridCol = $root.find("w\\:tblGrid w\\:gridCol");

        const coTable = new CoTable($wGridCol.length);
        coTable.addChildNodes(createContentsResult.value);

        for(let rowNum = 0; rowNum < coTable.childNodes.length; rowNum++) {
            const row = coTable.childNodes[rowNum];

            if (!row)
                continue;

            for (let colNum = 0; colNum < row.childNodes.length; colNum++) {
                const cell: CoTableCell = row.childNodes[colNum] as CoTableCell;
                let cellRowSpan = 0;

                if (cell.restart) {
                    let rowNumNext = rowNum + 1;
                    cellRowSpan += 1;

                    for (rowNumNext; rowNumNext < coTable.childNodes.length; rowNumNext++) {
                        const cellNext: CoTableCell = coTable.childNodes[rowNumNext]?.childNodes[colNum] as CoTableCell;

                        if (!cellNext || !cellNext.merge)
                            break;

                        cellRowSpan += 1;
                    }
                }

                cell.rowSpan = cellRowSpan;
            }
        }

        return new Ok(coTable);
    }
};