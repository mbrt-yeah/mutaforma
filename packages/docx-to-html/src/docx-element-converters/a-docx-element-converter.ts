import { AElementConverter, IConfig, IDocxFile } from "@mtfm/core-models";
import { CheerioAPI } from "cheerio";
import { Err, Ok, Result } from "ts-results-es";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

/**
 * An abstract base class for converting DOCX elements to their corresponding CoTreeNode elements.
 *
 * @abstract
 * @class ADocxElementConverter
 * @extends {AElementConverter<CheerioAPI, CoTreeNode>}
 * @template CoTreeNode - The type of the converted element.
 */
export abstract class ADocxElementConverter<CoTreeNode> extends AElementConverter<CheerioAPI, CoTreeNode> {
    protected __docxFile: IDocxFile;

    /**
     * Creates an instance of ADocxElementConverter.
     *
     * @param {IConfig} config - The configuration settings for the conversion process.
     * @param {IDocxFile} docxFile - The DOCX file to be converted.
     * @param {DocxElementConverterRegistry} elementConverterRegistry - The registry of element converters.
     */
    public constructor(
        config: IConfig,
        docxFile: IDocxFile,
        elementConverterRegistry: DocxElementConverterRegistry
    ) {
        super(config, elementConverterRegistry);
        this.__docxFile = docxFile;
    }

    /**
     * Gets the DOCX file associated with the converter.
     *
     * @returns {IDocxFile} - The DOCX file associated with the converter.
     */
    public get docxFile(): IDocxFile {
        return this.__docxFile;
    }

    /**
     * Converts the child elements of a DOCX element to their corresponding CoTreeNode elements.
     *
     * @param {CheerioAPI} $elem - The DOCX element whose child elements are to be converted.
     *
     * @returns {Promise<Result<CoTreeNode[], Error>>} - A promise that resolves to a result containing the converted CoTreeNode elements,
     *          or rejects with an error if the conversion fails.
     *
     * It converts the child elements of a DOCX element to their corresponding CoTreeNode elements. It does this by iterating
     * through each child element, creating a new converter for that element, and executing the converter. If any converter fails, the method
     * stops and returns an error. Otherwise, it returns a result containing the converted CoTreeNode elements.
     */
    protected async _convertContents($elem: CheerioAPI): Promise<Result<CoTreeNode[], Error>> {
        let error: Error | undefined = undefined;
        let contents: CoTreeNode[] = [];

        const $root = $elem(":root");
        const $rootChildren = $root.children();

        for (let i = 0; i < $rootChildren.length; i++) {
            const rootChild = $rootChildren[i];

            if (!rootChild)
                continue;

            const $child = cheerio.load(rootChild.cloneNode(true));
            const rootChildConverter = this.elementConverterRegistry.getConverter($child);

            if (!rootChildConverter)
                continue;

            const rootChildConverterResult = await rootChildConverter.execute($child);

            if (rootChildConverterResult.isErr()) {
                error = rootChildConverterResult.error;
                break;
            }

            contents.push(rootChildConverterResult.value);
        }

        if (error)
            return new Err(error);

        return new Ok(contents);
    }
};
