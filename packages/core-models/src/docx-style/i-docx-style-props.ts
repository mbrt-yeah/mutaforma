import { TDocxStyle } from "./t-docx-style.js";

export interface IDocxStyleProps {
    basedOn: string[];
    basedOnLowercase: string[];
    id: string;
    idLowercase: string;
    name: string;
    type: TDocxStyle;
};
