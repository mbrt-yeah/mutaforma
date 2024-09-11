import { AlberoNode } from "./albero-node.js";

export class Albero {
    private __rootNode?: AlberoNode | undefined;

    public constructor(rootNode?: AlberoNode) {
        this.__rootNode = rootNode;
    }

    public getRootNode(): AlberoNode | undefined {
        return this.__rootNode;
    }

    public setRootNode(newRootNode: AlberoNode): void {
        this.__rootNode = newRootNode;
    }
}