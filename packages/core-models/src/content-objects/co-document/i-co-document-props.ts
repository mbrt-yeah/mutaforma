import { ICoNote } from "../co-note/i-co-note.js";

export interface ICoDocumentProps {
    title: string;
    metadata: Record<string, string>;
    endnotes: ICoNote[];
    footnotes: ICoNote[];
};
