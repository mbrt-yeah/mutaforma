import { IAsset } from "../asset/i-asset.js";
import { INumbering } from "../numbering/i-numbering.js";
import { IStyle } from "../style/i-style.js";

export interface IDoc {
    contents: string;
    endnotes: string;
    footnotes: string;
    images: Record<string, IAsset>;
    metadata: Record<string, string>;
    numberings: Record<string, INumbering>;
    styles: Record<string, IStyle>;

    getImage(imageId: string | undefined): IAsset | undefined
    getNumberingFormat(numberingId: string | undefined, indentationLevel: string | undefined): string | undefined;
    getStyleByStyleId(id: string | undefined): IStyle | undefined;
};
