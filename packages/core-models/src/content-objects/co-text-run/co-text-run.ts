import { CoTreeNode } from "../co-tree-node.js";
import { ICoTextRun } from "./i-co-text-run.js";
import { ICoTextRunOpts } from "./i-co-text-run-opts.js";

export class CoTextRun extends CoTreeNode implements ICoTextRun {
    private __isBold: boolean;
    private __isItalic: boolean;
    private __isUnderline: boolean;
    private __isStrikethrough: boolean;
    private __isSubscript: boolean;
    private __isSuperscript: boolean;

    public constructor(options: ICoTextRunOpts = {}) {
        super(CoTextRun.name);
        this.__isBold = (options.isBold === undefined) ? false : options.isBold;
        this.__isItalic = (options.isItalic === undefined) ? false : options.isItalic;
        this.__isUnderline = (options.isUnderline === undefined) ? false : options.isUnderline;
        this.__isStrikethrough = (options.isStrikethrough === undefined) ? false : options.isStrikethrough;
        this.__isSubscript = (options.isSubscript === undefined) ? false : options.isSubscript;
        this.__isSuperscript = (options.isSuperscript === undefined) ? false : options.isSuperscript;
    }

    public hasEqualInlineFormatting(textRun: ICoTextRun): boolean {
        return this.isBold === textRun.isBold
            && this.isItalic === textRun.isItalic
            && this.isUnderline === textRun.isUnderline
            && this.isStrikethrough === textRun.isStrikethrough
            && this.isSubscript === textRun.isSubscript
            && this.isSuperscript === textRun.isSuperscript;
    }

    public get isBold(): boolean {
        return this.__isBold;
    }

    public get isItalic(): boolean {
        return this.__isItalic;
    }

    public get isUnderline(): boolean {
        return this.__isUnderline;
    }

    public get isStrikethrough(): boolean {
        return this.__isStrikethrough;
    }

    public get isSubscript(): boolean {
        return this.__isSubscript;
    }

    public get isSuperscript(): boolean {
        return this.__isSuperscript;
    }
};
