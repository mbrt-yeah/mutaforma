import { INumbering } from "./i-numbering.js";
import { INumberingLevel } from "../numbering-level/i-numbering-level.js";
import { INumberingOpts } from "./i-numbering-opts.js";

export class Numbering implements INumbering {
    private __id: string;
    private __idAbstract: string;
    private __levels: Record<number, INumberingLevel>;

    public constructor(opts: INumberingOpts = {}) {
        this.__id = opts.id || "";
        this.__idAbstract = opts.idAbstract || "";
        this.__levels = opts.levels || {};
    }

    public get id(): string {
        return this.__id;
    }

    public get idAbstract(): string {
        return this.__idAbstract;
    }

    public get levels(): Record<number, INumberingLevel> {
        return this.__levels;
    }
};