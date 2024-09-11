import { ElementDefinition } from "../element-definition/element-definition.js";
import { IConfigNoteList } from "./i-config-note-list.js";
import { IConfigNoteListOpts } from "./i-config-note-list-opts.js";
import { IElementDefinition } from "../element-definition/i-element-definition.js";

export class ConfigNoteList implements IConfigNoteList {
    private __enabled: boolean;
    private __element: IElementDefinition;

    public constructor(opts: IConfigNoteListOpts = {}) {
        this.__enabled = (opts.enabled !== undefined) ? opts.enabled : true;
        this.__element = opts.element || new ElementDefinition({
            name: "ol",
        });
    }

    public get enabled(): boolean {
        return this.__enabled;
    }

    public get element(): IElementDefinition {
        return this.__element;
    }
};
