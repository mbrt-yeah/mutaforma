import { ElementDefinition } from "../element-definition/element-definition.js";
import { IConfigNoteNumbering } from "./i-config-note-numbering.js";
import { IConfigNoteNumberingOpts } from "./i-config-note-numbering-opts.js";
import { IElementDefinition } from "../element-definition/i-element-definition.js";
import { TNoteNumberingStyles } from "../t-note-numbering-styles.js";

export class ConfigNoteNumbering implements IConfigNoteNumbering {
    private __element: IElementDefinition;
    private __style: TNoteNumberingStyles;

    public constructor(opts: IConfigNoteNumberingOpts = {}) {
        this.__element = opts.element || new ElementDefinition({
            name: "span",
            attrs: {
                class: "note-number"
            }
        });
        this.__style = opts.style || "decimal";
    }

    public get element(): IElementDefinition {
        return this.__element;
    }

    public get style(): TNoteNumberingStyles {
        return this.__style;
    }
};
