import { IDocConverterResult } from "@mtfm/core-models";
import { Result } from "ts-results-es";

import { IDocConverterResultSaverProps } from "./i-doc-converter-result-saver-props.js";

export interface IDocConverterResultSaver extends IDocConverterResultSaverProps {
    execute(fileConverterResult: IDocConverterResult): Promise<Result<void, Error[]>>
};
