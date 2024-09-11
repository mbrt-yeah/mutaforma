import { CoTreeNode } from "./co-tree-node.js";

export class CoText extends CoTreeNode {
    public value: string;

    public constructor(value?: string | undefined) {
        super(CoText.name);
        this.value = value ?? "";
    }
};
