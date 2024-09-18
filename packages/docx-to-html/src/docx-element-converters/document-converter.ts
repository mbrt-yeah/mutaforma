import { 
    CoDocument,
    IConfig,
    IDoc
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX document elements to their corresponding CoDocument elements.
 *
 * @class DocumentConverter
 * @extends {ADocxElementConverter<CoDocument>}
 */
export class DocumentConverter extends ADocxElementConverter<CoDocument> {
    /**
     * Creates an instance of DocumentConverter.
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
     * Converts a DOCX document element to its corresponding CoDocument element.
     *
     * @param {CheerioAPI} $elem - The DOCX document element to be converted.
     *
     * @returns {Promise<Result<CoDocument, Error>>} - A promise that resolves to a result containing the converted CoDocument element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoDocument, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const coDoc = new CoDocument();
        coDoc.addChildNodes(createContentsResult.value);
        return new Ok(coDoc);
    }
};
