import { IExecutable } from "@mtfm/core-models";
import * as cheerio from "cheerio";

import { Ok, Result } from "ts-results-es";

export class DocxContentHandlerDocxMetadataCore implements IExecutable<Record<string, string>> {
    public async execute(metadataCoreXml: string): Promise<Result<Record<string, string>, Error>> {
        const result: Record<string, string> = {};

        const $ = cheerio.load(metadataCoreXml, {
            xmlMode: true,
            xml: {
                lowerCaseTags: false,
                lowerCaseAttributeNames: false,
            },
        });

        const $metadataElems = $("cp\\:coreProperties > *");

        if (!$metadataElems || $metadataElems.length === 0)
            return new Ok(result);

        $metadataElems.each((_, elem) => {
            result[elem.tagName] = cheerio.load(elem).text()
        });

        return new Ok(result);
    }
};
