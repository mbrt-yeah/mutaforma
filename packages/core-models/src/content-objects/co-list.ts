import { CoTreeNode } from "./co-tree-node.js";

export class CoList extends CoTreeNode {
    public numberingFormat: string | undefined;

    public constructor() {
        super(CoList.name)
    }
};
