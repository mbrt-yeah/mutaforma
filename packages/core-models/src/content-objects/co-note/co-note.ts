import { CoTreeNode } from "../co-tree-node.js";
import { ICoNote } from "./i-co-note.js";
import { ICoNoteOpts } from "./i-co-note-opts";
import { TNoteTypes } from "../t-note-types.js";

export class CoNote extends CoTreeNode implements ICoNote {
    private __id: string;
    private __type: TNoteTypes;

    public constructor(opts: ICoNoteOpts = {}) {
        super(CoNote.name);
        this.__id = opts.id || "";
        this.__type = opts.type || "unknown";
    }

    public get id(): string {
        return this.__id;
    }

    public get type(): TNoteTypes {
        return this.__type;
    }
};
