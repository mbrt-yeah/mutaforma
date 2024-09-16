import { IElementDefinition } from "../element-definition/i-element-definition.js";
import { TNoteNumberingStyles } from "../t-note-numbering-styles.js";

export interface IConfigNoteNumbering {
    element: IElementDefinition;
    style: TNoteNumberingStyles;
};