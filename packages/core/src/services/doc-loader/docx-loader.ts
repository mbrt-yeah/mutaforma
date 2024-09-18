import { IDoc } from "@mtfm/core-models";
import { Result } from "ts-results-es";

import { ADocLoader } from "./a-doc-loader.js";
import { DocContentExtractorArchiveFile } from "../doc-content-extractor/doc-content-extractor-archive-file.js";
import { DocContentHandlerDocx } from "../doc-content-handler/doc-content-handler-docx/doc-content-handler-docx.js";
import { DocContentLoaderLocalFile } from "../doc-content-loader/doc-content-loader-local-file.js";

export class DocxLoader extends ADocLoader {
    public constructor() {
        super(
            new DocContentExtractorArchiveFile(),
            new DocContentLoaderLocalFile(),
            new DocContentHandlerDocx()
        );
    }

    public async execute(input: string | Buffer): Promise<Result<IDoc, Error>> {
        let content: Buffer;

        if (typeof input === "string") {
            const contentLoaderResult = await this._contentLoader.execute(input);

            if (contentLoaderResult.isErr())
                return contentLoaderResult;

            content = contentLoaderResult.value;
        } else {
            content = input;
        }

        const contentExtractorResult = await this._contentExtractor.execute(content);

        if (contentExtractorResult.isErr())
            return contentExtractorResult;

        return await this._contentPartsHandler.execute(contentExtractorResult.value);
    }
};
