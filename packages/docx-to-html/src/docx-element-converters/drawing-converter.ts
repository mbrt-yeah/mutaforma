import {
    CoImage,
    IConfig,
    IDoc,
} from "@mtfm/core-models";
import { convertEmuToPixel } from "@mtfm/core";
import { CheerioAPI } from "cheerio";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * A class for converting DOCX drawing elements to their corresponding CoImage elements.
 *
 * @class DrawingConverter
 * @extends {ADocxElementConverter<CoImage>}
 */
export class DrawingConverter extends ADocxElementConverter<CoImage> {
    /**
     * Creates an instance of DrawingConverter.
     *
     * @param {IConfig} config - The configuration settings for the conversion process.
     * @param {IDoc} doc - The DOCX file to be converted.
     * @param {DocxElementConverterRegistry} elementConverterRegistry - The registry of element converters.
     */
    public constructor(
        config: IConfig,
        doc: IDoc,
        elementConverterRegistry: DocxElementConverterRegistry
    ) {
        super(config, doc, elementConverterRegistry);
    }

    /**
     * Converts a DOCX drawing element to its corresponding image element.
     *
     * @param {CheerioAPI} $elem - The DOCX drawing element to be converted.
     *
     * @returns {Promise<Result<CoImage, Error>>} - A promise that resolves to a result containing the converted CoImage element,
     *          or rejects with an error if the conversion fails.
     */
    public async execute($elem: CheerioAPI): Promise<Result<CoImage, Error>> {
        const $root = $elem(":root", $elem.html());
        const $picPic = $root.find("pic\\:pic");
        const $picCNvPr = $picPic.find("pic\\:cNvPr");
        const $aBlip = $picPic.find("a\\:blip");
        const $aExt = $picPic.find("pic\\:spPr a\\:xfrm a\\:ext");

        const widthEmu = $aExt.attr("cx") || "0";
        const heightEmu = $aExt.attr("cy") || "0";
        const widthPx = Math.round( convertEmuToPixel(Number.parseInt(widthEmu)) );
        const heigthPx = Math.round( convertEmuToPixel(Number.parseInt(heightEmu)) );
        const imageId = $aBlip.attr("r:embed") || $aBlip.attr("r:link") ||"";
        const imageAsset = this.__doc.getImage(imageId);
        const imageName = imageAsset?.name || "";
        const imageDesc = $picCNvPr.attr("descr") || imageName;

        const coImage = new CoImage({
            data: imageAsset?.data ?? "",
            desc: imageDesc,
            ext: imageAsset?.ext || "",
            height: heigthPx,
            id: imageId,
            name: imageName,
            width: widthPx,
        });

        return new Ok(coImage);
    }
};