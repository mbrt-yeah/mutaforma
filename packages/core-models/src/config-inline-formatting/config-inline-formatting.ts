import { IElementDefinition } from "../element-definition/i-element-definition.js";
import { IConfigInlineFormattingOpts } from "./i-config-inline-formatting-opts.js";
import { IConfigInlineFormattingProps } from "./i-config-inline-formatting-props.js";

export class ConfigInlineFormatting implements IConfigInlineFormattingProps {
    private __bold: { enabled: boolean; element: IElementDefinition; };
    private __italic: { enabled: boolean; element: IElementDefinition; };
    private __underline: { enabled: boolean; element: IElementDefinition; };
    private __strikethrough: { enabled: boolean; element: IElementDefinition; };
    private __subscript: { enabled: boolean; element: IElementDefinition; };
    private __superscript: { enabled: boolean; element: IElementDefinition; };

    public constructor(opts: IConfigInlineFormattingOpts = {}) {
        this.__bold = opts.bold || { enabled: true, element: { name: "strong" } };
        this.__italic = opts.italic || { enabled: true, element: { name: "em" } };
        this.__underline = opts.underline || { enabled: true, element: { name: "u" } };
        this.__strikethrough = opts.strikethrough || { enabled: true, element: { name: "s" } };
        this.__subscript = opts.subscript || { enabled: true, element: { name: "sub" } };
        this.__superscript = opts.superscript || { enabled: true, element: { name: "sup" } };
    }

    public get bold(): { enabled: boolean; element: IElementDefinition; } {
        return this.__bold;
    }

    public get italic(): { enabled: boolean; element: IElementDefinition; } {
        return this.__italic;
    }

    public get underline (): { enabled: boolean; element: IElementDefinition; } {
        return this.__underline;
    }

    public get strikethrough(): { enabled: boolean; element: IElementDefinition; } {
        return this.__strikethrough;
    }

    public get subscript(): { enabled: boolean; element: IElementDefinition; } {
        return this.__subscript;
    }

    public get superscript(): { enabled: boolean; element: IElementDefinition; } {
        return this.__superscript;
    }
};
