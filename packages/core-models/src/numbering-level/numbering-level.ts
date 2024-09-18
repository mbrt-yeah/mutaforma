import { INumberingLevel } from "./i-numbering-level.js";
import { INumberingLevelOpts } from "./i-numbering-level-opts.js";

export class NumberingLevel implements INumberingLevel {
    private __level: number;
    private __numberingFormat: string;

    public constructor(opts: INumberingLevelOpts = {}) {
        this.__level = opts.level || 0;
        this.__numberingFormat = opts.numberingFormat || "unknown";
    }

    public get level(): number {
        return this.__level;
    }

    public get numberingFormat(): string {
        return this.__numberingFormat;
    }
};
