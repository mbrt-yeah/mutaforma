import { IAsset } from "@mtfm/core-models";
import { IStyle } from "../style/i-style.js";
import { INumbering } from "../numbering/i-numbering.js";

export interface IDocument {
    contents: string;
    endnotes: string;
    footnotes: string;
    images: Record<string, IAsset>;
    metadata: Record<string, string>;
    numberings: Record<string, INumbering>;
    styles: Record<string, IStyle>;
};
