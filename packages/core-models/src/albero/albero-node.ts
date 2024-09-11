interface Type<T> extends Function { new (...args: any[]): T; }

export class AlberoNode {
    protected __childNodes: AlberoNode[];
    protected __childNodesTotal: number;
    protected __lastChildNodePos: number;
    protected __parentNode: AlberoNode | undefined;

    /**
     * Creates an instance of AlberoNode
     */
    public constructor() {
        this.__childNodes = [];
        this.__childNodesTotal = 0;
        this.__lastChildNodePos = -1;
        this.__parentNode = undefined;
    }

    /**
     * Gets all children nodes child nodes
     * @returns child nodes 
     */
    public get childNodes(): AlberoNode[] {
        return this.__childNodes;
    }

    /**
     * Gets child nodes total
     * @returns the total number of child nodes
     */
    public get childNodesTotal(): number {
        return this.__childNodesTotal;
    }

     /**
     * Gets last child node postion
     * @returns The last index position of the array holding the child nodes
     */
    public get lastChildNodePos(): number {
        return this.__lastChildNodePos;
    }

    public get parentNode(): AlberoNode | undefined {
        return this.__parentNode;
    }

    public set parentNode(parentNode: AlberoNode) {
        this.__parentNode = parentNode;
    }

    /**
     * Adds one or more instances of T as child nodes
     *
     * @param childNodes One or more instances of T as child nodes
     * @returns
     */
    public addChildNodes(childNodes: AlberoNode | AlberoNode[]): void {
        childNodes = this.__arrayfy<AlberoNode>(childNodes);

        for (const childNode of childNodes)
            childNode.parentNode = this;

        this.__childNodes.push(...childNodes);
        return this.__doAfterAddOperation(childNodes.length);
    }

    /**
     * Adds one or more instances of T as child nodes at a particular index position
     * 
     * @param childNodes One or more instances of T as child nodes
     * @param pos The index position at which to insert the child nodes
     * @returns 
     */
    public addChildNodesAtPos(childNodes: AlberoNode | AlberoNode[], pos: number): void {
        childNodes = this.__arrayfy<AlberoNode>(childNodes);
        const l = childNodes.length;

        if (l === 0)
            return this.addChildNodes(childNodes);

        for (const childNode of childNodes)
            childNode.parentNode = this;

        this.childNodes.splice(pos, 0, ...childNodes);
        return this.__doAfterAddOperation(l);
    }

    /**
     * Finds all child nodes of Type<S>
     * 
     * @param type The Type<S>
     * @returns An array with all child nodes of Type<S>. In case no child node has Type<S> an empty array is returned
     */
    public findChildNodesByType<S extends AlberoNode>(type: Type<S>): S[] {
        if (this.childNodesTotal === 0)
            return [];

        const results: S[] = [];

        for (const childNode of this.childNodes) {
            if (childNode instanceof type)
                results.push(childNode);
        }

        return results;
    }

    public findDescendantNodesByType<S extends AlberoNode>(type: Type<S>, acc: S[] = []): S[] {
        if (this.childNodesTotal === 0)
            return acc;

        for (const childNode of this.childNodes) {
            if (childNode instanceof type)
                acc.push(childNode);

            childNode.findDescendantNodesByType(type, acc);
        }

        return acc;
    }

    /**
     * Replaces all child nodes with new ones
     * 
     * @param childNodes One or more instances of T as child nodes
     * @returns
     */
    public replaceAllChildNodes(childNodes: AlberoNode | AlberoNode[]): void {
        childNodes = this.__arrayfy<AlberoNode>(childNodes);

        for (const childNode of childNodes)
            childNode.parentNode = this;

        this.__childNodes = childNodes;
        this.__childNodesTotal = 0;
        this.__lastChildNodePos = 0;
        return this.__doAfterAddOperation(childNodes.length);
    }

    /**
     * Removes one child node at a particular position.
     * This methods uses the splice method internally and
     * thus modifies the existing array of child nodes.
     * 
     * @param pos The position at which to remove a child node
     * @returns The removed child node or undefined if the position is out of bounds or if no child nodes are present.
     */
    public removeChildNodeAtPos(pos: number): AlberoNode | undefined {
        if (this.childNodesTotal === 0 || pos > this.lastChildNodePos)
            return;

        const childNodeRemoved = this.childNodes.splice(pos, 1);
        this.__doAfterRemovalOperation(1);
        return childNodeRemoved[0];
    }

    /**
     * Removes child nodes at particular positions.
     * This methods uses the splice method internally and
     * thus modifies the existing array of child nodes.
     * 
     * @param poss An array with the positions at which to remove the child nodes
     * @returns An array with the removed child nodes
     */
    public removeChildNodesAtManyPos(poss: number[]): AlberoNode[] {
        if (this.childNodesTotal === 0)
            return [];

        const childNodesRemoved: AlberoNode[] = [];
        let childNodesRemovedTotal = 0;

        for (const pos of poss) {
            const childNodeRemoved = this.removeChildNodeAtPos(pos - childNodesRemovedTotal);

            if (childNodeRemoved) {
                childNodesRemoved.push(childNodeRemoved);
                childNodesRemovedTotal += 1;
            }
        }

        return childNodesRemoved;
    }

    /**
     * Wraps a single instance of T in an array
     * 
     * @param instances One or more instances of T
     * @returns An array of one or more instances of T
     */
    private __arrayfy<T>(instances: T | T[]): T[] {
        if ( Array.isArray(instances) ) {
            return instances;
        }

        return [instances];
    }

    /**
     * Adjusts the values of the childNodesTotal and 
     * lastChildNodePos properties after an operation that 
     * added child nodes
     * @param childNodesAddedTotal Total number of new child nodes added
     */
    private __doAfterAddOperation(childNodesAddedTotal: number): void {
        this.__childNodesTotal += childNodesAddedTotal;
        this.__lastChildNodePos = this.__childNodesTotal - 1;
        return;
    }

     /**
      * Adjusts the values of the childNodesTotal and 
      * lastChildNodePos properties after an operation that 
      * removed child nodes
      * @param childNodesRemovedTotal Total number of child nodes removed
      * @returns 
      */
     private __doAfterRemovalOperation(childNodesRemovedTotal: number): void {
        return this.__doAfterAddOperation(-childNodesRemovedTotal);
    }
};
