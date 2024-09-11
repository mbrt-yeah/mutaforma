import { CheerioAPI } from "cheerio";

import { IDocxStyle } from "../docx-style/i-docx-style.js";
import { IDocxNumberingSchema } from "../docx-numbering-schema/i-docx-numbering-schema.js";
import { IAsset } from "../asset/i-asset.js";

export interface IDocxFileProps {
    document: CheerioAPI | undefined;
    endnotes: CheerioAPI | undefined;
    footnotes: CheerioAPI | undefined;
    // hyperlinks: { [key: string]: MtfmHyperlink };
    images: { [key: string]: IAsset };
    metadata: { [key: string]: string };
    numberingSchemes: { [key: string]: IDocxNumberingSchema };
    styles: { [key: string]: IDocxStyle };
};
