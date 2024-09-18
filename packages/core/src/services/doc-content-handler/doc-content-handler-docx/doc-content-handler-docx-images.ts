import { Asset, IAsset, IExecutable } from "@mtfm/core-models";
import { parse } from "node:path";
import * as cheerio from "cheerio";

import { Ok, Result } from "ts-results-es";

export class DocContentHandlerDocxImages implements IExecutable<Record<string, IAsset>> {
    public async execute(imagesXml: string, archive: Record<string, string>): Promise<Result<Record<string, IAsset>, Error>> {
        const result: Record<string, IAsset> = {};

        const $ = cheerio.load(imagesXml, {
            xmlMode: true,
            xml: {
                lowerCaseTags: false,
                lowerCaseAttributeNames: false,
            },
        });

        const relationships = $("Relationship").toArray();

        if (relationships.length === 0)
            return new Ok(result);

        let imageCounter = 0;

        for (const relationship of relationships) {
            const id = relationship.attribs["Id"];
            const target = relationship.attribs["Target"];
            const targetMode = relationship.attribs["TargetMode"];
            const type = relationship.attribs["Type"];

            if (!id || !target || type !== "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image")
                continue;

            let data: string | undefined = undefined;

            if (targetMode && targetMode === "External") {
                data = "";
                // TODO load file - target contains path
            } else {
                data = archive[`word/${target}`];
            }

            imageCounter += 1;
            const imageName = `image-${imageCounter}`;
            const imageExt = parse(target).ext.split(".").pop();

            result[id] = new Asset({
                data: data || "",
                dataEncoding: "base64",
                ext: imageExt || "",
                id,
                name: imageName || "",
            });
        }

        return new Ok(result);
    }
};
