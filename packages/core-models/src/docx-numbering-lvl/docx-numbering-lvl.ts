import { IDocxNumberingLvlOpts } from "./i-docx-numbering-lvl-opts.js";
import { IDocxNumberingLvl } from "./i-docx-numbering-lvl.js";

export class DocxNumberingLvl implements IDocxNumberingLvl {
    public level: number;
    public numberingFormat: string;

    public constructor(opts: IDocxNumberingLvlOpts = {}) {
        this.level = opts.level || 0;
        this.numberingFormat = opts.numberingFormat || "unknown";
    }
};
