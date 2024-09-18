import { CheerioAPI } from "cheerio";
import { CoBody, IConfig, IDoc } from "@mtfm/core-models";
import { CoListCreator } from "@mtfm/core";
import { Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX body elements to their corresponding CoBody elements.
 *
 * @class BodyConverter
 * @extends {ADocxElementConverter<CoBody>}
 */
export class BodyConverter extends ADocxElementConverter<CoBody> {
    /**
     * Creates an instance of BodyConverter.
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
     * Asynchronously converts a DOCX body element to its corresponding CoBody element.
     *
     * @param {CheerioAPI} $elem - The DOCX body element to be converted.
     *
     * @returns {Promise<Result<CoBody, Error>>} - A promise that resolves to a result containing the converted CoBody element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoBody, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const coBody = new CoBody();
        coBody.addChildNodes(createContentsResult.value);

        const listCreator = new CoListCreator({ input: coBody });
        return listCreator.execute();
    }
};