import { ElementDefinition } from "../element-definition/element-definition.js";
import { IConfigNotesHeading } from "./i-config-notes-heading.js";
import { IConfigNotesHeadingOpts } from "./i-config-notes-heading-opts.js";
import { IElementDefinition } from "../element-definition/i-element-definition.js";

export class ConfigNotesHeading implements IConfigNotesHeading {
    private __enabled: boolean;
    private __element: IElementDefinition;

    public constructor(opts: IConfigNotesHeadingOpts = {}) {
        this.__enabled = (opts.enabled !== undefined) ? opts.enabled : true;
        this.__element = opts.element || new ElementDefinition({
            content: "Notes",
            name: "h2",
        });
    }

    public get enabled(): boolean {
        return this.__enabled;
    }

    public get element(): IElementDefinition {
        return this.__element;
    }
};
