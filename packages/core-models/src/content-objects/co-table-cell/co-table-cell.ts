import { CoTreeNode } from "../co-tree-node.js";
import { ICoTableCell } from './i-co-table-cell.js';
import { ICoTableCellOpts } from "./i-co-table-cell-opts.js";

export class CoTableCell extends CoTreeNode implements ICoTableCell {
    private __colSpan: number;
    private __rowSpan: number;
    private __restart: boolean;
    private __merge: boolean;

    public constructor(opts: ICoTableCellOpts = {}) {
        super(CoTableCell.name);
        this.__colSpan = opts.colSpan || 0;
        this.__rowSpan = opts.rowSpan || 0;
        this.__restart = opts.restart || false;
        this.__merge = opts.merge || false;
    }

    public get colSpan(): number {
        return this.__colSpan;
    }

    public get rowSpan(): number {
        return this.__rowSpan;
    }

    public set rowSpan(rowSpan: number) {
        this.__rowSpan = rowSpan;
    }

    public get restart(): boolean {
        return this.__restart;
    }

    public get merge(): boolean {
        return this.__merge;
    }
};
