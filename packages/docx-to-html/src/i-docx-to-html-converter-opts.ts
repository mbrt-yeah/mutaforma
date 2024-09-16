import { IConfigOpts } from "@mtfm/core-models";

export interface IDocxToHtmlConverterOpts<TInput> {
    input: TInput;
    outputPath?: string | undefined;
    config?: IConfigOpts | undefined;
}