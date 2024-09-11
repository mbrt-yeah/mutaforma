import { IConfig } from "../config/i-config.js";

export interface IDocumentConverterProps<TInput> {
    input: TInput;
    outputPath: string | undefined;
    config: IConfig;
};