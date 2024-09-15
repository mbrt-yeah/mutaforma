import { IElementDefinition } from "../element-definition/i-element-definition.js";

export interface IConfigInlineFormattingProps {
    bold: {
        enabled: boolean;
        element: IElementDefinition
    },
    italic: {
        enabled: boolean;
        element: IElementDefinition
    },
    underline: {
        enabled: boolean;
        element: IElementDefinition
    },
    strikethrough: {
        enabled: boolean;
        element: IElementDefinition
    }
    subscript: {
        enabled: boolean;
        element: IElementDefinition
    },
    superscript: {
        enabled: boolean;
        element: IElementDefinition
    }
};
