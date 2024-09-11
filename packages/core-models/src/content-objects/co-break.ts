import { CoTreeNode } from "./co-tree-node.js";

export class CoBreak extends CoTreeNode {
    public type: string;

    public constructor(type: string) {
        super(CoBreak.name)
        this.type = type;
    }
};
