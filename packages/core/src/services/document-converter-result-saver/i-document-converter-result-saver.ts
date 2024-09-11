import { IDocumentConverterResult } from "@mtfm/core-models";
import { Result } from "ts-results-es";

import { IDocumentConverterResultSaverProps } from "./i-document-converter-result-saver-props.js";

export interface IDocumentConverterResultSaver extends IDocumentConverterResultSaverProps {
    execute(fileConverterResult: IDocumentConverterResult): Promise<Result<void, Error[]>>
};
