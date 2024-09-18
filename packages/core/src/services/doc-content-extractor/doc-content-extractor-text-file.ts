import { Ok, Result } from "ts-results-es";
import { tryCatch } from "@swiss-army-knife/utilities";

import { IDocContentExtractor } from "./i-doc-content-extractor.js";

export class DocContentExtractorTextFile implements IDocContentExtractor<string> {
    public async execute(data: Buffer): Promise<Result<string, Error>> {
        const toStringResult = tryCatch(() => data.toString("utf-8"));

        if (toStringResult.isErr())
            return toStringResult;

        return new Ok(toStringResult.value);
    }
};
