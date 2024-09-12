import { IConfigHtmlEntities } from "../config-html-entities/i-config-html-entities.js";
import { IConfigNoteList } from "../config-note-list/i-config-note-list.js";
import { IConfigNoteListItem } from "../config-note-list-item/i-config-note-list-item.js";
import { IConfigNoteNumbering } from "../config-note-numbering/i-config-note-numbering.js";
import { IConfigNotesHeading } from "../config-notes-heading/i-config-notes-heading.js";
import { IConfigNotesWrapper } from "../config-notes-wrapper/i-config-notes-wrapper.js";
import { IConfigPrettyPrint } from "../config-pretty-print/i-config-pretty-print.js";
import { IStyleMapping } from "../style-mapping/i-style-mapping.js";

export interface IConfigProps {
    endnotesHeading: IConfigNotesHeading;
    endnotesList: IConfigNoteList;
    endnotesListItem: IConfigNoteListItem;
    endnotesNumbering: IConfigNoteNumbering;
    endnotesWrapper: IConfigNotesWrapper;
    footnotesHeading: IConfigNotesHeading;
    footnotesList: IConfigNoteList;
    footnotesListItem: IConfigNoteListItem;
    footnotesNumbering: IConfigNoteNumbering;
    footnotesWrapper: IConfigNotesWrapper;
    mappings: IStyleMapping[];
    outDocExt: string;
    outDocFileName: string;
    outHtmlEntities: IConfigHtmlEntities;
    outImgFolderName: string;
    outPrettyPrint: IConfigPrettyPrint;
    outRemoveEmptyParas: boolean;
};
