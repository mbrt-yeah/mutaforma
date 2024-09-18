import { TStyleTypes } from "./t-style-types.js";

export interface IStyleProps {
    basedOn: string[];
    basedOnLowercase: string[];
    id: string;
    idLowercase: string;
    name: string;
    type: TStyleTypes;
};
