import { ICoNote } from "../co-note/i-co-note.js";
import { ICoDocumentProps } from "./i-co-document-props.js";

export interface ICoDocument extends ICoDocumentProps {
    addEndnotes(endnotes: ICoNote[]): void;
    addFootnotes(footnotes: ICoNote[]): void;
};
