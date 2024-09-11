import { CoTreeNode } from "./co-tree-node.js";
import { IStyleMapping } from "../style-mapping/i-style-mapping.js";

export class CoParagraph extends CoTreeNode {
    public indentationLevel: number | undefined;
    public mapping: IStyleMapping | undefined;
    public numberingFormat: string | undefined;

    public constructor(name?: string | undefined) {
        super(name ?? CoParagraph.name);
    }
};
