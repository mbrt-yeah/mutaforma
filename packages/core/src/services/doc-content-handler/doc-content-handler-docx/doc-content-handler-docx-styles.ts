import { IExecutable, IStyle, Style, TStyleTypes } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";
import * as cheerio from "cheerio";

export class DocContentHandlerDocxStyles implements IExecutable<Record<string, IStyle>> {
    public async execute(stylesXml: string): Promise<Result<Record<string, IStyle>, Error>> {
        const result: Record<string, IStyle> = {};

        const $ = cheerio.load(stylesXml, {
            xmlMode: true,
            xml: {
                lowerCaseTags: false,
                lowerCaseAttributeNames: false,
            },
        });

        const $wStyleElems = $("w\\:style");

        if ($wStyleElems.length === 0)
            return new Ok(result);

        $wStyleElems.each((_, wStyleElem) => {
            const $wStyleElem = cheerio.load(wStyleElem);
            const $wStyleElemRoot = $wStyleElem(":root");

            const basedOn = this.__getBaseStyleIds($wStyleElem, []);
            const id = $wStyleElemRoot.attr("w:styleId");
            const name = $wStyleElemRoot.find("w\\:name").attr("w:val");
            const type = $wStyleElemRoot.attr("w:type");

            if (id && name && type) {
                result[id] = new Style({
                    basedOn,
                    id,
                    name,
                    type: type as TStyleTypes || "unknown",
                });
            }
        });

        return new Ok(result);
    }

    private __getBaseStyleIds = ($wStyleElem: cheerio.CheerioAPI, baseStyleIds: string[]): string[] => {
        if (!$wStyleElem)
            return baseStyleIds;

        const $wStyleElemRoot = $wStyleElem(":root");
        const baseStyleId = $wStyleElemRoot.find("w\\:basedOn").attr("w:val");

        if (!baseStyleId)
            return baseStyleIds;

        baseStyleIds.push(baseStyleId);

        const $baseStyleElem = $wStyleElemRoot.find(`w\\:style[w\\:styleId=${baseStyleId}]`);

        if ($baseStyleElem.length === 0)
            return baseStyleIds;

        const baseStyleElem = $baseStyleElem[0];

        if (!baseStyleElem)
            return baseStyleIds;

        return this.__getBaseStyleIds(cheerio.load(baseStyleElem), baseStyleIds);
    };
};
