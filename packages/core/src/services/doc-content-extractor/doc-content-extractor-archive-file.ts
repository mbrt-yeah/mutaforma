import { Ok, Result } from "ts-results-es";
import { tryCatch } from "@swiss-army-knife/utilities";
import { unzipSync } from "fflate";

import { IDocContentExtractor } from "./i-doc-content-extractor.js";

export class DocContentExtractorArchiveFile implements IDocContentExtractor<Record<string, string>> {
    public async execute(data: Buffer): Promise<Result<Record<string, string>, Error>> {
        const unzipSyncResult = tryCatch(() => unzipSync(data));

        if (unzipSyncResult.isErr())
            return unzipSyncResult;

        const files = unzipSyncResult.value;
        const filesFinal: Record<string, string> = {};

        for (const [fileName, fileData] of Object.entries(files)) {
            if (fileName.startsWith("word/media"))
                filesFinal[fileName] = Buffer.from(fileData).toString("base64");
            else
                filesFinal[fileName] = Buffer.from(fileData).toString("utf-8");
        };

        return new Ok(filesFinal);
    }
};
