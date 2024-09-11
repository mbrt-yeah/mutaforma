import { 
    CoParagraph,
    IConfig,
    IDocxFile,
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
     * Converts a DOCX paragraph element to its corresponding CoParagraph element.
     *
     * @param {CheerioAPI} $elem - The DOCX paragraph element to be converted.
     *
     * @returns {Promise<Result<CoParagraph, Error>>} - A promise that resolves to a result containing the converted CoParagraph element,
     *          or rejects with an error if the conversion fails.
     *
     * It does this by first converting the child elements of the DOCX paragraph element. If the conversion of the child elements is successful,
     * the method determines the type of paragraph (e.g., heading, normal, etc.) based on the style and indentation level of the paragraph. It then
     * creates a new `CoParagraph` object, sets its child nodes to the converted child elements, and sets its mapping, numbering format, and
     * indentation level based on the extracted information. Finally, a result containing the `CoParagraph` object is returned. If the conversion
     * of the child elements fails, the error is propagated and returned.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoParagraph, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const $root = $elem(":root", $elem.html());

        const indentationLevel = $root.find("w\\:pPr").find("w\\:numPr").find("w\\:ilvl").attr("w:val");
        const numberingId = $root.find("w\\:pPr").find("w\\:numPr").find("w\\:numId").attr("w:val");
        const styleId = $root.find("w\\:pPr").find("w\\:pStyle").attr("w:val");
        const style = this.docxFile.getStyleByStyleId(styleId);

        const para = determineParagraphSubType(styleId, indentationLevel);
        para.addChildNodes(createContentsResult.value);
        para.mapping = this.config.getStyleMappingByName(style?.name);
        para.numberingFormat = this.docxFile.getNumberingFormat(numberingId, indentationLevel);

        if (indentationLevel)
            para.indentationLevel = Number.parseInt(indentationLevel);

        return new Ok(para);
    }
};
