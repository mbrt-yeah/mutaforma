import { IExecutable, INumbering, INumberingLevel, Numbering, NumberingLevel } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";
import * as cheerio from "cheerio";

export class DocContentHandlerDocxNumberings implements IExecutable<Record<string, INumbering>> {
    public async execute(numberingsXml: string): Promise<Result<Record<string, INumbering>, Error>> {
        const result: Record<string, INumbering> = {};

        const $ = cheerio.load(numberingsXml, {
            xmlMode: true,
            xml: {
                lowerCaseTags: false,
                lowerCaseAttributeNames: false,
            },
        });

        const $wAbstractNumIds = $("w\\:abstractNumId");

        for (let i = 0; i < $wAbstractNumIds.length; i++) {
            const $wAbstractNumId = $($wAbstractNumIds[i])
            const $wNum = $wAbstractNumId.parent();

            const wNumId = $wNum.attr("w:numId");
            const wAbstractNumId = $wAbstractNumId.attr("w:val");

            if (!wNumId || !wAbstractNumId)
                continue;

            const $wAbstractNum = $(`w\\:abstractNum[w\\:abstractNumId=${wAbstractNumId}]`);

            if ($wAbstractNum.length === 0)
                continue;

            const $wLvls = $wAbstractNum.find("w\\:lvl");

            if ($wLvls.length === 0)
                continue;

            const wNumberingLevels: Record<string, INumberingLevel> = {};

            for (let i = 0; i < $wLvls.length; i++) {
                const $wLvl = $($wLvls[i]);
                const level = $wLvl.attr("w:ilvl");
                const levelAsInt = (level) ? Number.parseInt(level) : 0;
                const wNumFmt = $wLvl.find("w\\:numFmt").attr("w:val");

                if (!level)
                    continue;

                wNumberingLevels[levelAsInt] = new NumberingLevel({
                    level: levelAsInt,
                    numberingFormat: wNumFmt || "unknown",
                });
            }

            result[wNumId] = new Numbering({
                id: wNumId,
                idAbstract: wAbstractNumId,
                levels: wNumberingLevels,
            });
        }

        return new Ok(result);
    }
};
