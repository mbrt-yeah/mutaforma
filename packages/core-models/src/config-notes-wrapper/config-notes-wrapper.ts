import { ElementDefinition } from "../element-definition/element-definition.js";
import { IConfigNotesWrapper } from "./i-config-notes-wrapper.js";
import { IConfigNotesWrapperOpts } from "./i-config-notes-wrapper-opts.js";
import { IElementDefinition } from "../element-definition/i-element-definition.js";

export class ConfigNotesWrapper implements IConfigNotesWrapper {
    private __enabled: boolean;
    private __element: IElementDefinition;

    public constructor(opts: IConfigNotesWrapperOpts = {}) {
        this.__enabled = (opts.enabled !== undefined) ? opts.enabled : true;
        this.__element = opts.element || new ElementDefinition({
            name: "div",
            attrs: {
                class: "notes-section",
            }
        });
    }

    public get enabled(): boolean {
        return this.__enabled;
    }

    public get element(): IElementDefinition {
        return this.__element;
    }
};
