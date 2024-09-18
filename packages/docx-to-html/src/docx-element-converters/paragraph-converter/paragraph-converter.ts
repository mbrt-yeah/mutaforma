import { 
    CoParagraph,
    IConfig,
    IDoc,
    IStyleMapping,
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "../a-docx-element-converter.js";
import { determineParagraphSubType } from "./determine-paragraph-subtype.js";
import { DocxElementConverterRegistry } from "../../docx-element-converter-registry.js";

/**
 * A class for converting DOCX paragraph elements to their corresponding CoParagraph elements.
 *
 * @class ParagraphConverter
 * @extends {ADocxElementConverter<CoParagraph>}
 */
export class ParagraphConverter extends ADocxElementConverter<CoParagraph> {
    /**
     * Creates an instance of ParagraphConverter.
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
     * Converts a DOCX paragraph element to its corresponding CoParagraph element.
     *
     * @param {CheerioAPI} $elem - The DOCX paragraph element to be converted.
     *
     * @returns {Promise<Result<CoParagraph, Error>>} - A promise that resolves to a result containing the converted CoParagraph element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoParagraph, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const $root = $elem(":root", $elem.html());

        const indentationLevel = $root.find("w\\:pPr").find("w\\:numPr").find("w\\:ilvl").attr("w:val");
        const numberingId = $root.find("w\\:pPr").find("w\\:numPr").find("w\\:numId").attr("w:val");
        const styleId = $root.find("w\\:pPr").find("w\\:pStyle").attr("w:val");
        const style = this.doc.getStyleByStyleId(styleId);

        const para = determineParagraphSubType(styleId, indentationLevel);
        para.addChildNodes(createContentsResult.value);
        para.mapping = this.__getStyleMappingByName(style?.name);
        para.numberingFormat = this.doc.getNumberingFormat(numberingId, indentationLevel);

        if (indentationLevel)
            para.indentationLevel = Number.parseInt(indentationLevel);

        return new Ok(para);
    }

    private __getStyleMappingByName(name: string | undefined): IStyleMapping | undefined {
        if (!name)
            return undefined;

        return this.config.mappings.find(m => m.names.indexOf(name) !== -1);
    }
};
