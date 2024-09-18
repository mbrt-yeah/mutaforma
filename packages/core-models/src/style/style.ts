import { IStyle } from "./i-style.js";
import { IStyleOpts } from "./i-style-opts.js";
import { TStyleTypes } from "./t-style-types.js";

export class Style implements IStyle {
    public basedOn: string[];
    public basedOnLowercase: string[];
    public id: string;
    public idLowercase: string;
    public name: string;
    public type: TStyleTypes;

    public constructor(opts: IStyleOpts) {
        this.basedOn = opts.basedOn || [];
        this.basedOnLowercase = this.basedOn.map(val => val.toLowerCase());
        this.id = opts.id || "";
        this.idLowercase = this.id.toLowerCase();
        this.name = opts.name || "";
        this.type = opts.type || "unknown";
    }
};
