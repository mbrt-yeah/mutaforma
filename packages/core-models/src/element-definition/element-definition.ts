import { IElementDefinitionOpts } from "./i-element-definition-opts.js";
import { IElementDefinition } from "./i-element-definition.js";

export class ElementDefinition implements IElementDefinition {
    public attrs: { [name: string]: string; };
    public content?: string | undefined;
    public name: string;

    public constructor(opts: IElementDefinitionOpts = {}) {
        this.attrs = opts.attrs || {};
        this.content = opts.content;
        this.name = opts.name || "p";
    }
};
