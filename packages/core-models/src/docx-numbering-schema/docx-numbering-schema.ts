import { IDocxNumberingLvl } from "../docx-numbering-lvl/i-docx-numbering-lvl.js";
import { IDocxNumberingSchema } from "./i-docx-numbering-schema.js";
import { IDocxNumberingSchemaOpts } from "./i-docx-numbering-schema-opts.js";

export class DocxNumberingSchema implements IDocxNumberingSchema {
    public idAbstract: string;
    public id: string;
    public levels: { [key: string]: IDocxNumberingLvl; };

    public constructor(opts: IDocxNumberingSchemaOpts = {}) {
        this.idAbstract = opts.idAbstract || "";
        this.id = opts.id || "";
        this.levels = opts.levels || {};
    }

    getNumberingFormatForLevel(level: string): string | undefined {
        if ( !this.levels[level] )
            return undefined;

        return this.levels[level].numberingFormat;
    }
};
