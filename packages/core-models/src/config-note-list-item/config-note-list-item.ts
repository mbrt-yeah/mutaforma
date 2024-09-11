import { ElementDefinition } from "../element-definition/element-definition.js";
import { IElementDefinition } from "../element-definition/i-element-definition.js";
import { IConfigNoteListItem } from "./i-config-note-list-item.js";
import { IConfigNoteListItemOpts } from "./i-config-note-list-item-opts.js";

export class ConfigNoteListItem implements IConfigNoteListItem {
    private __enabled: boolean;
    private __element: IElementDefinition;

    public constructor(opts: IConfigNoteListItemOpts = {}) {
        this.__enabled = (opts.enabled !== undefined) ? opts.enabled : true;
        this.__element = opts.element || new ElementDefinition({
            name: "li",
        });
    }

    public get enabled(): boolean {
        return this.__enabled;
    }

    public get element(): IElementDefinition {
        return this.__element;
    }
};
