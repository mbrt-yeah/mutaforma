import {
    CoBreak,
    IConfig,
    IDoc,
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX break elements to their corresponding CoBreak elements.
 *
 * @class BreakConverter
 * @extends {ADocxElementConverter<CoBreak>}
 */
export class BreakConverter extends ADocxElementConverter<CoBreak> {
    
    /**
     * Creates an instance of BreakConverter.
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
     * Converts a DOCX break element to its corresponding CoBreak element.
     *
     * @param {CheerioAPI} $elem - The DOCX break element to be converted.
     *
     * @returns {Promise<Result<CoBreak, Error>>} - A promise that resolves to a result containing the converted CoBreak element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoBreak, Error>> {
        const $root = $elem(":root", $elem.html());
        const type = $root.attr("w:type");

        const coBreak = new CoBreak(type || "");
        return new Ok(coBreak);
    }
};