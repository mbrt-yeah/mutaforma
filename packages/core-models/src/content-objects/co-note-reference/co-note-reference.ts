import { CoTreeNode } from "../co-tree-node.js";
import { ICoNoteReference } from "./i-co-note-reference.js";
import { ICoNoteReferenceOpts } from "./i-co-note-reference-opts.js";
import { TNoteNumberingStyles } from "../../t-note-numbering-styles.js";
import { TNoteTypes } from "../../t-note-types.js";

export class CoNoteReference extends CoTreeNode implements ICoNoteReference {
    private __id: string;
    private __numberingStyle: TNoteNumberingStyles;
    private __type: TNoteTypes;

    public constructor(opts: ICoNoteReferenceOpts = {}) {
        super(CoNoteReference.name);
        this.__id = opts.id || "";
        this.__numberingStyle = opts.numberingStyle || "decimal";
        this.__type = opts.type || "unknown";
    }

    public get id(): string {
        return this.__id;
    }

    public get numberingStyle(): TNoteNumberingStyles {
        return this.__numberingStyle;
    }

    public get type(): TNoteTypes {
        return this.__type;
    }
}