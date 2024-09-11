import { IConversionDescription } from "../conversion-description/i-conversion-description.js";
import { IConversionWhitelistProps } from "./i-conversion-whitelist-props.js";

export interface IConversionWhitelist extends IConversionWhitelistProps {
    getConversionDescription(fromFileExtension: string, toFileExtension: string): IConversionDescription | undefined
    getDistinctSources(): IConversionDescription[];
    getDistinctTargets(): IConversionDescription[];
    getMimeTypeForFromByFileExtension(fileExtension: string): string | undefined;
    isConversionAllowed(fromFileExtension: string, toFileExtension: string): boolean;
};
