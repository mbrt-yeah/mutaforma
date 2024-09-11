import { IConfig } from "../config/i-config.js";

export interface IDocumentConverterOpts<TInput> {
    input: TInput;
    outputPath?: string | undefined;
    config?: IConfig | undefined;
};
