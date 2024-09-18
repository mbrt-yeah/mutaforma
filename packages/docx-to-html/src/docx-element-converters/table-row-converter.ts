import { 
    CoTableRow,
    IConfig,
    IDoc
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX table row elements to their corresponding CoTableRow elements.
 *
 * @class TableRowConverter
 * @extends {ADocxElementConverter<CoTableRow>}
 */
export class TableRowConverter extends ADocxElementConverter<CoTableRow> {

    /**
     * Creates an instance of TableRowConverter.
     *
     * @param {IConfig} config - The configuration settings for the conversion process.
     * @param {IDoc} doc - The DOCX file to be converted.
     * @param {DocxElementConverterRegistry} elementConverterRegistry - The registry of element converters.
     */
    public constructor(
        config: IConfig,
        doc: IDoc,
        elementConverterRegistry: DocxElementConverterRegistry
    ) {
        super(config, doc, elementConverterRegistry);
    }

    /**
     * Asynchronously converts a DOCX table row element to its corresponding CoTableRow element.
     *
     * @param {CheerioAPI} $elem - The DOCX table row element to be converted.
     *
     * @returns {Promise<Result<CoTable, Error>>} - A promise that resolves to a result containing the converted CoTableRow element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoTableRow, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const coTableRow = new CoTableRow();
        coTableRow.addChildNodes(createContentsResult.value);
        return new Ok(coTableRow);
    }
};