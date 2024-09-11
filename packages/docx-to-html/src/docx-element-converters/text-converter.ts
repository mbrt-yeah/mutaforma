import { 
    CoText,
    IConfig,
    IDocxFile
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX text elements to their corresponding CoText elements.
 *
 * @class TextConverter
 * @extends {ADocxElementConverter<CoText>}
 */
export class TextConverter extends ADocxElementConverter<CoText> {
    /**
     * Creates an instance of TextConverter.
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
     * Converts a DOCX text element to its corresponding HTML element.
     *
     * @param {CheerioAPI} $elem - The DOCX text element to be converted.
     *
     * @returns {Promise<Result<CoText, Error>>} - A promise that resolves to a result containing the converted CoText element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoText, Error>> {
        const $t = $elem("w\\:t");

        const coText = new CoText();
        coText.value = $t.text();
        return new Ok(coText);
    }

    public executeSync(): Result<CoText, Error> {
        throw new Error("Method not implemented.");
    }
};
