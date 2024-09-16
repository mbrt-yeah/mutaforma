import { IElementDefinitionOpts } from "../element-definition/i-element-definition-opts.js";
import { TNoteNumberingStyles } from "../t-note-numbering-styles.js";

export interface IConfigNoteNumberingOpts {
    element?: IElementDefinitionOpts;
    style?: TNoteNumberingStyles;
};
