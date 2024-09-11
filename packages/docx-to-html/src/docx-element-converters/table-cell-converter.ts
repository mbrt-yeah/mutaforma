import { 
    CoTableCell,
    IConfig,
    IDocxFile
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX table cell elements to their corresponding CoTableCell elements.
 *
 * @class TableCellConverter
 * @extends {ADocxElementConverter<CoTableCell>}
 */
export class TableCellConverter extends ADocxElementConverter<CoTableCell> {

    /**
     * Creates an instance of CoTableCellConverter.
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
     * Asynchronously converts a DOCX table cell element to its corresponding CoTableCell element.
     *
     * @param {CheerioAPI} $elem - The DOCX table cell element to be converted.
     *
     * @returns {Promise<Result<CoTableCell, Error>>} - A promise that resolves to a result containing the converted CoTableCell element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoTableCell, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const $root = $elem(":root", $elem.html());
        const colSpan = $root.find("w\\:tcPr w\\:gridSpan").attr("w:val") || "0";
        const wVMerge = $root.find("w\\:tcPr w\\:vMerge");

        let coTableCellRestart = false;
        let coTableCellMerge = false;

        if (wVMerge.length === 1) {
            const wVMergeVal = wVMerge.attr("w:val");

            if (wVMergeVal && wVMergeVal === "restart")
                coTableCellRestart = true;
            else
                coTableCellMerge = true;
        }

        const coTableCell = new CoTableCell({
            colSpan: Number.parseInt(colSpan),
            restart: coTableCellRestart,
            merge: coTableCellMerge,
        });
        coTableCell.addChildNodes(createContentsResult.value);
        return new Ok(coTableCell);
    }
};