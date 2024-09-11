import { IDocxNumberingSchemaProps } from "./i-docx-numbering-schemaprops";

export interface IDocxNumberingSchema extends IDocxNumberingSchemaProps {
    getNumberingFormatForLevel(level: string): string | undefined;
};
