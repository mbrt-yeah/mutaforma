import { IConfig } from "@mtfm/core-models";
import { IDocLoader } from "../doc-loader/i-doc-loader.js";

export interface IDocConverterOpts {
    outputPath?: string | undefined;
    config: IConfig;
    docLoader?: IDocLoader | undefined;
};
