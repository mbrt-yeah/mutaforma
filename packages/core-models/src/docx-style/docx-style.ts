import { IDocxStyle } from "./i-docx-style.js";
import { IDocxStyleOpts } from "./i-docx-style-opts.js";
import { TDocxStyle } from "./t-docx-style.js";

export class DocxStyle implements IDocxStyle {
    public basedOn: string[];
    public basedOnLowercase: string[];
    public id: string;
    public idLowercase: string;
    public name: string;
    public type: TDocxStyle;

    public constructor(opts: IDocxStyleOpts) {
        this.basedOn = opts.basedOn || [];
        this.basedOnLowercase = this.basedOn.map(val => val.toLowerCase());
        this.id = opts.id || "";
        this.idLowercase = this.id.toLowerCase();
        this.name = opts.name || "";
        this.type = opts.type || "unknown";
    }
};
