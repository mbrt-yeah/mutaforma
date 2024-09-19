import { CoTreeNode } from "../co-tree-node.js";
import { ICoDocument } from "./i-co-document.js";
import { ICoDocumentOpts } from "./i-co-document-opts.js";
import { ICoNote } from "../co-note/i-co-note.js";

export class CoDocument extends CoTreeNode implements ICoDocument {
    private __title: string;
    private __metadata: Record<string, string>
    private __endnotes: ICoNote[];
    private __footnotes: ICoNote[];

    public constructor(opts: ICoDocumentOpts = {}) {
        super(CoDocument.name);
        this.__title = opts.title || "";
        this.__metadata = opts.metadata || {};
        this.__endnotes = opts.endnotes || [];
        this.__footnotes = opts.footnotes || [];
    }

    public get title(): string {
        return this.__title;
    }

    public set title(title: string) {
        this.__title = title;
    }

    public get metadata(): Record<string, string> {
        return this.__metadata;
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

    public addMetadatum(key: string, value: string) {
        this.__metadata[key] = value;
        return;
    }

    public addMetadata(metadata: Record<string, string>) {
        for (const [key, value] of Object.entries(metadata))
            this.addMetadatum(key, value);

        return;
    }
};
