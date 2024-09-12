import { TNoteNumberingStyles } from "../../t-note-numbering-styles.js";
import { TNoteTypes } from "../../t-note-types.js";

export interface ICoNoteProps {
    id: string;
    numberingStyle: TNoteNumberingStyles;
    type: TNoteTypes;
};
