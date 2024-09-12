import { TNoteNumberingStyles } from "../../t-note-numbering-styles.js";
import { TNoteTypes } from "../../t-note-types.js";

export interface ICoNoteReferenceProps {
    id: string;
    numberingStyle: TNoteNumberingStyles;
    type: TNoteTypes;
};
