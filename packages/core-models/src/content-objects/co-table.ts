import { CoTreeNode } from "./co-tree-node.js";

export class CoTable extends CoTreeNode {
    public columnsTotal: number;

    public constructor(columnsTotal: number) {
        super(CoTable.name);
        this.columnsTotal = columnsTotal;
    }
};