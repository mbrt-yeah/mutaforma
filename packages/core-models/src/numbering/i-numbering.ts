import { INumberingProps } from "./i-numbering-props.js";

export interface INumbering extends INumberingProps {
    getNumberingFormatForLevel(level: string): string | undefined;
};
