import { CoTreeNode } from "../co-tree-node.js";
import { ICoDocument } from "./i-co-document.js";
import { ICoDocumentOpts } from "./i-co-document-opts.js";
import { ICoNote } from "../co-note/i-co-note.js";

export class CoDocument extends CoTreeNode implements ICoDocument {
    private __endnotes: ICoNote[];
    private __footnotes: ICoNote[];

    public constructor(opts: ICoDocumentOpts = {}) {
        super(CoDocument.name);
        this.__endnotes = opts.endnotes || [];
        this.__footnotes = opts.footnotes || [];
    }
    public get endnotes(): ICoNote[] {
        return this.__endnotes;
    }

    public get footnotes(): ICoNote[] {
        return this.__footnotes;
    }

    public addEndnotes(endnotes: ICoNote[]) {
        this.__endnotes.push(...endnotes);
        return;
    }

    public addFootnotes(footnotes: ICoNote[]) {
        this.__footnotes.push(...footnotes);
        return;
    }
};
