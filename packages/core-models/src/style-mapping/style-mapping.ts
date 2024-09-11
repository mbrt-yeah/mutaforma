import { ElementDefinition } from "../element-definition/element-definition.js";
import { IElementDefinition } from "../element-definition/i-element-definition.js";
import { IStyleMappingOpts } from "./i-style-mapping-opts.js";
import { IStyleMapping } from "./i-style-mapping.js";

export class StyleMapping implements IStyleMapping {
    public names: string[];
    public element: IElementDefinition;

    public constructor(opts: IStyleMappingOpts = {}) {
        this.names = opts.names || [];
        this.element = opts.element || new ElementDefinition();
    }
};
