import { AlberoNode } from "../albero/albero-node.js";

export class CoTreeNode extends AlberoNode {
    private __nodeName: string;

    public constructor(nodeName: string) {
        super();
        this.__nodeName = nodeName;
    }

    public get nodeName(): string {
        return this.__nodeName;
    }
};
