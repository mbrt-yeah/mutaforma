import { IElementDefinitionOpts } from "../element-definition/i-element-definition-opts.js";

export interface IConfigInlineFormattingOpts {
    bold?: {
        enabled?: boolean;
        element?: IElementDefinitionOpts;
    },
    italic?: {
        enabled?: boolean;
        element?: IElementDefinitionOpts;
    },
    underline?: {
        enabled?: boolean;
        element?: IElementDefinitionOpts;
    },
    strikethrough?: {
        enabled?: boolean;
        element?: IElementDefinitionOpts;
    }
    subscript?: {
        enabled?: boolean;
        element?: IElementDefinitionOpts;
    },
    superscript?: {
        enabled?: boolean;
        element?: IElementDefinitionOpts;
    }
};
