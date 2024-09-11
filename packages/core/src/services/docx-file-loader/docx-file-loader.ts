import { 
    Asset,
    DocxFile,
    DocxNumberingLvl,
    DocxNumberingSchema,
    DocxStyle,
    IAsset,
    IDocxFile,
    IDocxNumberingSchema,
    IDocxStyle,
    TDocxStyle
} from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Err, Ok, Result } from "ts-results-es";
import { parse } from "node:path";
import { readFile } from "node:fs";
import { tryCatch } from "@swiss-army-knife/utilities";
import { unzipSync } from "fflate";
import * as cheerio from "cheerio";

import { IDocxFileLoader } from "./i-docx-file-loader.js";

type TDocxArchiveFileList = { [fileName: string]: string };

export class DocxFileLoader implements IDocxFileLoader {
    public input: string | Buffer;

    public constructor(input: string | Buffer) {
        this.input = input;
    }

    public async execute(): Promise<Result<IDocxFile, Error>> {
        const loadArchiveResult = await this.__loadArchive(this.input);

        if (loadArchiveResult.isErr()) 
            return loadArchiveResult;

        const extractArchiveFilesResult = await this.__extractArchiveFiles(loadArchiveResult.value);

        if (extractArchiveFilesResult.isErr())
            return extractArchiveFilesResult;

        const createDocxFileResult = await this.__createDocxFile(extractArchiveFilesResult.value);

        if (createDocxFileResult.isErr())
            return createDocxFileResult;

        return new Ok(createDocxFileResult.value);
    }

    private async __loadArchive(input: string | Buffer): Promise<Result<Buffer, Error>> {
        if (this.input instanceof Buffer)
            return new Ok(input as Buffer);
        
        return new Promise((resolve) => {
            readFile(this.input, (err, buffer) => {
                if (err) 
                    return resolve(new Err(err));

                return resolve(new Ok(buffer));
            });
        });
    }

    private async __extractArchiveFiles(data: Buffer): Promise<Result<TDocxArchiveFileList, Error>> {
        const unzipSyncResult = tryCatch(() => unzipSync(data));

        if (unzipSyncResult.isErr())
            return unzipSyncResult;

        const files = unzipSyncResult.value;
        const filesFinal: TDocxArchiveFileList = {};

        for (const [fileName, fileData] of Object.entries(files)) {
            if (fileName.startsWith("word/media"))
                filesFinal[fileName] = Buffer.from(fileData).toString("base64");
            else
                filesFinal[fileName] = Buffer.from(fileData).toString("utf-8");
        };

        return new Ok(filesFinal);
    }

    private async __createDocxFile(files: TDocxArchiveFileList): Promise<Result<IDocxFile, Error>> {
        let error: Error | undefined = undefined;
        const docxFile = new DocxFile();

        if (typeof this.input === "string")
            docxFile.filePath = this.input;

        const fileHandlers: { [key: string]: ($: CheerioAPI, files?: TDocxArchiveFileList | undefined) => void }= {
            [DocxFile.DOCUMENT_XML_PART_NAME]: ($: CheerioAPI): void => {
                docxFile.document = $;
            },

            [DocxFile.ENDNOTES_XML_PART_NAME]: ($: CheerioAPI): void => {
                docxFile.endnotes = $;
            },

            [DocxFile.FOOTNOTES_XML_PART_NAME]: ($: CheerioAPI): void => {
                docxFile.footnotes = $;
            },

            /*
            [DocxFile.DOC_PROPS_CORE_PART_NAME]: ($: CheerioAPI): void => {
                docxFile.metadata = this.__handleMetadataFile(wMetadataElement);
            },
            */

            [DocxFile.NUMBERING_XML_PART_NAME]: ($: CheerioAPI): void => {
                docxFile.numberingSchemes = this.__handleNumberingPart($);
            },

            [DocxFile.DOCUMENT_XML_RELS_PART_NAME]: ($: CheerioAPI, files: TDocxArchiveFileList | undefined): void  => {
                docxFile.images = this.__handleImages($, files);
            },

            [DocxFile.STYLES_XML_PART_NAME]: ($: CheerioAPI): void  => {
                docxFile.styles = this.__handleStylePart($);
            }
        };

        for (const [fileName, fileContent] of Object.entries(files)) {
            if ( !docxFile.isPartSupported(fileName) || !fileContent || typeof fileContent !== "string")
                continue;

            const $ = cheerio.load(fileContent, {
                xmlMode: true,
                xml: {
                    lowerCaseTags: false,
                    lowerCaseAttributeNames: false,
                },
            });

            const entryHandler = fileHandlers[fileName];

            if (!entryHandler)
                continue;

            entryHandler($, files);
        }

        if (error)
            return new Err(error);

        return new Ok(docxFile);
    }

    private __handleImages($: CheerioAPI, files: TDocxArchiveFileList | undefined): { [key: string]: IAsset } {
        const images: { [key: string]: IAsset } = {};

        if (!files)
            return images;

        const relationships = $("Relationship").toArray();

        if (relationships.length === 0)
            return images;

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
                data = files[`word/${target}`];
            }

            imageCounter += 1;
            const imageName = `image-${imageCounter}`;
            const imageExt = parse(target).ext.split(".").pop();

            images[id] = new Asset({
                data: data || "",
                dataEncoding: "base64",
                ext: imageExt || "",
                id,
                name: imageName || "",
            });
        }

        return images;
    }

    /*
    private __handleMetadataFile(root: CheerioAPI): { [key: string]: string } {
        const metadata: { [key: string]: string } = {};

        for (const metadataElement of root.childNodes) {
            metadata[metadataElement.tagName] = cheerio(metadataElement).text();
        }

        return metadata;
    }
    */

    public __handleNumberingPart($: CheerioAPI): { [key: string]: IDocxNumberingSchema } {
        const numberingSchemes: { [key: string]: IDocxNumberingSchema } = {};

        if (!$)
            return numberingSchemes;

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

            const numberingSchema = new DocxNumberingSchema({
                id: wNumId,
                idAbstract: wAbstractNumId,
                levels: {},
            });

            const wNumberingLevels: { [key: string]: DocxNumberingLvl } = {};

            for (let i = 0; i < $wLvls.length; i++) {
                const $wLvl = $($wLvls[i]);
                const level = $wLvl.attr("w:ilvl");
                const levelAsInt = (level) ? Number.parseInt(level) : 0;
                const wNumFmt = $wLvl.find("w\\:numFmt").attr("w:val");

                if (!level)
                    continue;

                wNumberingLevels[levelAsInt] = new DocxNumberingLvl({
                    level: levelAsInt,
                    numberingFormat: wNumFmt || "unknown",
                });
            }

            numberingSchema.levels = wNumberingLevels;
            numberingSchemes[wNumId] = numberingSchema;
        }

        return numberingSchemes;
    }

    private __handleStylePart($: CheerioAPI): { [key: string]: IDocxStyle } {
        const docxStyles: { [key: string]: IDocxStyle } = {};

        if (!$)
            return docxStyles;

        const $wStyleElems = $("w\\:style");

        if ($wStyleElems.length === 0)
            return docxStyles;

        $wStyleElems.each((_, wStyleElem) => {
            const $wStyleElem = cheerio.load(wStyleElem);
            const $wStyleElemRoot = $wStyleElem(":root");

            const basedOn = this.__getBaseStyleIds($wStyleElem, []);
            const id = $wStyleElemRoot.attr("w:styleId");
            const name = $wStyleElemRoot.find("w\\:name").attr("w:val");
            const type = $wStyleElemRoot.attr("w:type");

            if (id && name && type) {
                const docxStyle = new DocxStyle({
                    basedOn,
                    id,
                    name,
                    type: type as TDocxStyle || "unknown",
                });

                docxStyles[docxStyle.id] = docxStyle;
            }
        });

        return docxStyles;
    }

    private __getBaseStyleIds = ($wStyleElem: CheerioAPI, baseStyleIds: string[]): string[] => {
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
}