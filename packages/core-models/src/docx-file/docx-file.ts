import { CheerioAPI } from "cheerio";

import { AFile } from "../a-file.js";
import { IAsset } from "../asset/i-asset.js";
import { IDocxFile } from "./i-docx-file.js";
import { IDocxNumberingSchema } from "../docx-numbering-schema/i-docx-numbering-schema.js";
import { IDocxStyle } from "../docx-style/i-docx-style.js";

export class DocxFile extends AFile implements IDocxFile {
    public static readonly DOC_PROPS_CORE_PART_NAME = "docProps/core.xml";
    public static readonly DOCUMENT_XML_PART_NAME = "word/document.xml";
    public static readonly DOCUMENT_XML_RELS_PART_NAME = "word/_rels/document.xml.rels";
    public static readonly ENDNOTES_XML_PART_NAME = "word/endnotes.xml";
    public static readonly FOOTNOTES_XML_PART_NAME = "word/footnotes.xml";
    public static readonly NUMBERING_XML_PART_NAME = "word/numbering.xml";
    public static readonly STYLES_XML_PART_NAME = "word/styles.xml";

    public static readonly SUPPORTED_PARTS = [
        DocxFile.DOC_PROPS_CORE_PART_NAME,
        DocxFile.DOCUMENT_XML_PART_NAME,
        DocxFile.DOCUMENT_XML_RELS_PART_NAME,
        DocxFile.ENDNOTES_XML_PART_NAME,
        DocxFile.FOOTNOTES_XML_PART_NAME,
        DocxFile.NUMBERING_XML_PART_NAME,
        DocxFile.STYLES_XML_PART_NAME
    ];

    public document: CheerioAPI | undefined;
    public endnotes: CheerioAPI | undefined;
    public footnotes: CheerioAPI | undefined;
    // public hyperlinks: { [key: string]: MtfmHyperlink };
    public images: { [key: string]: IAsset };
    public metadata: { [key: string]: string };
    public numberingSchemes: { [key: string]: IDocxNumberingSchema };
    public styles: { [key: string]: IDocxStyle };

    public constructor(filePath?: string | undefined) {
        super(filePath || "");
        // this.hyperlinks = {};
        this.images = {};
        this.metadata = {};
        this.numberingSchemes = {};
        this.styles = {};
    }

    public getNumberingFormat(numberingId: string | undefined, indentationLevel: string | undefined): string | undefined {
        if (!numberingId || !indentationLevel)
            return undefined;

        const numberingSchema = this.numberingSchemes[numberingId];

        if (!numberingSchema)
            return undefined;

        return numberingSchema.getNumberingFormatForLevel(indentationLevel);
    }

    public getImage(imageId: string | undefined): IAsset | undefined {
        if (!imageId)
            return undefined;

        return this.images[imageId];
    }

    public getStyleByStyleId(styleId: string | undefined): IDocxStyle | undefined {
        if (!styleId)
            return undefined;

        return this.styles[styleId];
    }

    public isPartSupported(name: string | undefined): boolean {
        return name !== undefined && DocxFile.SUPPORTED_PARTS.indexOf(name) !== -1;
    }
}