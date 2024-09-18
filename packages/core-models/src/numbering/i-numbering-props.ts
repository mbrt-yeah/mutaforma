import { INumberingLevel } from "../numbering-level/i-numbering-level.js";

export interface INumberingProps {
    id: string;
    idAbstract: string;
    levels: Record<number, INumberingLevel>;
};
