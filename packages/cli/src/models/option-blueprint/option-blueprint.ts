import { IOptionBlueprint } from "./i-option-blueprint.js";
import { IOptionBlueprintOpts } from "./i-option-blueprint-opts.js";

export class OptionBlueprint implements IOptionBlueprint {
    private __dataType: string;
    private __description: string;
    private __longFlag: string;
    private __shortFlag: string;

    public constructor(opts: IOptionBlueprintOpts = {}) {
        this.__dataType = opts.dataType || "";
        this.__description = opts.description || "";
        this.__longFlag = opts.longFlag || "";
        this.__shortFlag = opts.shortFlag || "";
    }

    get flags(): string {
        let flags = "";

        if (this.shortFlag)
            flags += `-${this.shortFlag}, --${this.longFlag}`;
        else
            flags += `--${this.longFlag}`;

        if (this.dataType)
            flags += ` <${this.dataType}>`;

        return flags;
    }

    public get dataType(): string {
        return this.__dataType;
    }

    public get description(): string {
        return this.__description;
    }

    public get longFlag(): string {
        return this.__longFlag;
    }

    public get shortFlag(): string {
        return this.__shortFlag;
    }
};