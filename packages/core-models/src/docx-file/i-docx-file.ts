import { IAsset } from "../asset/i-asset.js";
import { IDocxFileProps } from "./i-docx-file-props.js";
import { IDocxStyle } from "../docx-style/i-docx-style.js";

export interface IDocxFile extends IDocxFileProps {
    getImage(imageId: string | undefined): IAsset | undefined
    getNumberingFormat(numberingId: string | undefined, indentationLevel: string | undefined): string | undefined;
    getStyleByStyleId(id: string | undefined): IDocxStyle | undefined;
    isPartSupported(name: string | undefined): boolean;
};
