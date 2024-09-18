import { IAsset } from "../asset/i-asset.js";
import { IDoc } from "./i-doc.js";
import { INumbering } from "../numbering/i-numbering.js";
import { IStyle } from "../style/i-style.js";

export class Doc implements IDoc {
    public contents: string;
    public endnotes: string;
    public footnotes: string;
    public images: Record<string, IAsset>;
    public metadata: Record<string, string>;
    public numberings: Record<string, INumbering>;
    public styles: Record<string, IStyle>;

    public constructor() {
        this.contents = "";
        this.endnotes = "";
        this.footnotes = "";
        this.images = {};
        this.metadata = {};
        this.numberings = {};
        this.styles = {};
    }

    public getNumberingFormat(numberingId: string | undefined, indentationLevel: string | undefined): string | undefined {
        if (!numberingId || !indentationLevel)
            return undefined;

        const numberingSchema = this.numberings[numberingId];

        if (!numberingSchema)
            return undefined;

        return numberingSchema.getNumberingFormatForLevel(indentationLevel);
    }

    public getImage(imageId: string | undefined): IAsset | undefined {
        if (!imageId)
            return undefined;

        return this.images[imageId];
    }

    public getStyleByStyleId(styleId: string | undefined): IStyle | undefined {
        if (!styleId)
            return undefined;

        return this.styles[styleId];
    }
};
