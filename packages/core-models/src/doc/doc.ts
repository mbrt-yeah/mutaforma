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
};
