import { IDocxNumberingLvl } from "../docx-numbering-lvl/i-docx-numbering-lvl.js";

export interface IDocxNumberingSchemaProps {
    id: string;
    idAbstract: string;
    levels: { [key: number]: IDocxNumberingLvl };
};
