import { 
    CoTextRun,
    IConfig,
    IDoc,
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX text runs to their corresponding CoTextRun elements.
 *
 * @class TextRunConverter
 * @extends {ADocxElementConverter<CoTextRun>}
 */
export class TextRunConverter extends ADocxElementConverter<CoTextRun> {
    /**
     * Creates an instance of TextRunConverter.
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
     * Converts a DOCX text run element to its corresponding HTML element.
     *
     * @param {CheerioAPI} $elem - The DOCX text run element to be converted.
     *
     * @returns {Promise<Result<CoTextRun, Error>>} - A promise that resolves to a result containing the converted CoTextRun element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoTextRun, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const $root = $elem(":root", $elem.html());
        const $wpPr = $root.find("w\\:rPr");
        const $wb = $wpPr.find("w\\:b");
        const $wi = $wpPr.find("w\\:i");
        const $wu = $wpPr.find("w\\:u");
        const $wStrike = $wpPr.find("w\\:strike");
        const $wVertAlign = $wpPr.find("w\\:vertAlign")

        const coTextRun = new CoTextRun({
            isBold: $wb.length > 0,
            isItalic: $wi.length > 0,
            isUnderline: $wu.length > 0,
            isStrikethrough: $wStrike.length > 0,
            isSubscript: $wVertAlign.length > 0 && $wVertAlign.attr("w:val") === "subscript",
            isSuperscript: $wVertAlign.length > 0 && $wVertAlign.attr("w:val") === "superscript",
        });
        coTextRun.addChildNodes(createContentsResult.value);
        return new Ok(coTextRun);
    }

    public executeSync(): Result<CoTextRun, Error> {
        throw new Error("Method not implemented.");
    }
};
