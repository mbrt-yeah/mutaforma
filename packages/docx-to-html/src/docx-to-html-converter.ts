import { 
    ADocumentConverter,
    Asset,
    CoDocument,
    Config,
    CoNote,
    CoTreeNode,
    DocumentConverterResult,
    IConfig,
    IDocumentConverterOpts,
    IDocumentConverterResult,
    IDocxFile,
} from "@mtfm/core-models";

import {
    CoDocumentToHtmlConverter,
    DocumentConverterResultSaver,
    DocxFileLoader,
} from "@mtfm/core";

import { CheerioAPI } from "cheerio";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import { Err, Ok, Result } from "ts-results-es";
import { html_beautify } from "js-beautify";
import * as cheerio from "cheerio";

import { DocxElementConverterRegistry } from "./docx-element-converter-registry.js";

/**
 * Converts a DOCX file to HTML.
 *
 * @class DocxToHtmlConverter
 * @extends {ADocumentConverter}
 */
export class DocxToHtmlConverter extends ADocumentConverter<string | Buffer, IDocumentConverterResult> {
    /**
     * Creates an instance of DocxToHtmlConverter.
     *
     * @param {IDocumentConverterOpts<string | Buffer>} opts - The options for the conversion process.
     */
    public constructor(opts: IDocumentConverterOpts<string | Buffer>) {
        if (!opts.config) {
            opts.config = DocxToHtmlConfigDefault;
        } else {
            opts.config = new Config({
                endnotesWrapper: opts.config.endnotesWrapper ?? DocxToHtmlConfigDefault.endnotesWrapper,
                endnotesHeading: opts.config.endnotesHeading ?? DocxToHtmlConfigDefault.endnotesHeading,
                endnotesList: opts.config.endnotesList ?? DocxToHtmlConfigDefault.endnotesList,
                endnotesListItem: opts.config.endnotesListItem ?? DocxToHtmlConfigDefault.endnotesListItem,
                endnotesNumbering: opts.config.endnotesNumbering ?? DocxToHtmlConfigDefault.endnotesNumbering,
                footnotesWrapper: opts.config.footnotesWrapper ?? DocxToHtmlConfigDefault.footnotesWrapper,
                footnotesHeading: opts.config.footnotesHeading ?? DocxToHtmlConfigDefault.footnotesHeading,
                footnotesList: opts.config.footnotesList ?? DocxToHtmlConfigDefault.footnotesList,
                footnotesListItem: opts.config.footnotesListItem ?? DocxToHtmlConfigDefault.footnotesListItem,
                footnotesNumbering: opts.config.footnotesNumbering ?? DocxToHtmlConfigDefault.footnotesNumbering,
                mappings: opts.config.mappings ?? DocxToHtmlConfigDefault.mappings,
                outDocExt: opts.config.outDocExt ?? DocxToHtmlConfigDefault.outDocExt,
                outDocFileName: opts.config.outDocFileName ?? DocxToHtmlConfigDefault.outDocFileName,
                outImgFolderName: opts.config.outImgFolderName ?? DocxToHtmlConfigDefault.outImgFolderName,
                outHtmlEntities: opts.config.outHtmlEntities ?? DocxToHtmlConfigDefault.outHtmlEntities,
                outPrettyPrint: opts.config.outPrettyPrint ?? DocxToHtmlConfigDefault.outPrettyPrint,
                outRemoveEmptyParas: (opts.config.outRemoveEmptyParas !== undefined) ? opts.config.outRemoveEmptyParas :DocxToHtmlConfigDefault.outRemoveEmptyParas,
            });
        }

        super(opts);
    }

    /**
     * Executes the main conversion process from Docx to HTML.
     *
     * @returns {Promise<Result<IDocumentConverterResult, Error>>} - A Promise that resolves to a Result containing the converted document result if successful,
     *          or rejects with an error if the conversion fails.
     */
    public async execute(): Promise<Result<IDocumentConverterResult, Error>> {
        this.emit("loadingDocStart");

        const loadDocxFileResult = await this.__loadDocxFile(this.input);

        if (loadDocxFileResult.isErr()) {
            this.emit("loadingDocError", loadDocxFileResult.error);
            return loadDocxFileResult;
        }

        this.emit("loadingDocSuccess");

        const docxFile = loadDocxFileResult.value;
        const registry = new DocxElementConverterRegistry(this.config, docxFile);

        this.emit("convertingDocStart");

        const convertDocumentResult = await this.__convertDocument(docxFile, this.config, registry);

        if (convertDocumentResult.isErr()) {
            this.emit("convertingDocError", convertDocumentResult.error);
            return convertDocumentResult;
        }

        this.emit("convertingDocSuccess");

        const result = new DocumentConverterResult({
            document: new Asset({
                data: convertDocumentResult.value,
                dataEncoding: "utf-8",
                name: this.config.outDocFileName,
                ext: this.config.outDocExt,
            }),
            images: Object.values(docxFile.images) || [],
        });

        if (this.outputPath !== undefined) {
            this.emit("savingOutputStart");

            const saveResult = await this.__saveResultToDisk(this.outputPath, result, this.config);

            if (saveResult.isErr()) {
                for(const error of saveResult.error)
                    this.emit("savingOutputError", error);
            }

            this.emit("savingOutputSuccess");
        }

        return new Ok(result);
    }

    /**
     * Loads a DocxFile from the provided input.
     *
     * @param {string | Buffer} input - The input data for the DocxFile. This can be either a string representing the file path 
     *                          or a Buffer containing the file data.
     *
     * @returns {Promise<Result<IDocxFile, Error>>} - A Promise that resolves to a Result containing the loaded DocxFile if successful,
     *          or rejects with an error if the conversion fails.
     */
    private async __loadDocxFile(input: string | Buffer): Promise<Result<IDocxFile, Error>> {
        const docxFileLoader = new DocxFileLoader(input);
        return await docxFileLoader.execute();
    }

    /**
     * Converts the document.xml portion of  DocxFile to its corresponding HTML document.
     *
     * @param {IDocxFile} docxFile - The DocxFile to be converted.
     * @param {IConfig} config - The configuration to be used for the conversion.
     * @param {DocxElementConverterRegistry} registry - The registry of element converters to be used for the conversion.
     *
     * @returns {Promise<Result<string, Error>>} - A promise that resolves to a result containing the converted document as a string, or rejects
     *          with an error if the conversion fails.
     */
    private async __convertDocument(docxFile: IDocxFile, config: IConfig, registry: DocxElementConverterRegistry): Promise<Result<string, Error>> { 
        const passOneResult = await this.__executePass1(registry, docxFile.document);

        if (passOneResult.isErr())
            return passOneResult;

        const coDocument = passOneResult.value as CoDocument;

        const convertEndnotesResult = await this.__convertDocumentEndnotes(docxFile, registry);

        if (convertEndnotesResult.isErr())
            return convertEndnotesResult;

        coDocument.addEndnotes(convertEndnotesResult.value as CoNote[]);

        const convertFootnotesResult = await this.__convertDocumentFootnotes(docxFile, registry);

        if (convertFootnotesResult.isErr())
            return convertFootnotesResult;

        coDocument.addFootnotes(convertFootnotesResult.value as CoNote[]);

        return await this.__executePass99(coDocument, config);
    }

    /**
     * Converts all the DOCX endnote elements in the document to their corresponding CoTreeNode elements.
     *
     * @param docxFile - The DOCX file to be converted.
     * @param registry - The registry of element converters to be used for the conversion.
     *
     * @returns A promise that resolves to a result containing the converted CoTreeNode elements, or rejects with an error if the conversion fails.
     */
    private async __convertDocumentEndnotes(docxFile: IDocxFile, registry: DocxElementConverterRegistry): Promise<Result<CoTreeNode[], Error>> {
        if (!docxFile.endnotes)
            return new Ok([]);

        const $wEndnotes = docxFile.endnotes(":root").find("w\\:endnote");

        const result: CoTreeNode[] = [];
        let error: Error | undefined = undefined;

        for(let i = 0; i < $wEndnotes.length; i++) {
            const wEndnoteElement = $wEndnotes[i];

            if (!wEndnoteElement || ["separator", "continuationSeparator"].indexOf(wEndnoteElement.attribs["w:type"] || "") !== -1)
                continue;

            const $wEndnoteElement = cheerio.load(wEndnoteElement);

            const passOneResult = await this.__executePass1(registry, $wEndnoteElement);

            if (passOneResult.isErr()) {
                error = passOneResult.error;
                break;
            }

            result.push(passOneResult.value);
        }

        if (error)
            return new Err(error);

        return new Ok(result);
    }

    /**
     * Converts all the DOCX footnote elements in the document to their corresponding CoTreeNode elements.
     *
     * @param docxFile - The DOCX file to be converted.
     * @param registry - The registry of element converters to be used for the conversion.
     *
     * @returns A promise that resolves to a result containing the converted CoTreeNode elements, or rejects with an error if the conversion fails.
     */
    private async __convertDocumentFootnotes(docxFile: IDocxFile, registry: DocxElementConverterRegistry): Promise<Result<CoTreeNode[], Error>> {
        if (!docxFile.footnotes)
            return new Ok([]);

        const $wFootnotes = docxFile.footnotes(":root").find("w\\:footnote");

        const result: CoTreeNode[] = [];
        let error: Error | undefined = undefined;

        for(let i = 0; i < $wFootnotes.length; i++) {
            const wFootnoteElement = $wFootnotes[i];

            if (!wFootnoteElement || ["separator", "continuationSeparator"].indexOf(wFootnoteElement.attribs["w:type"] || "") !== -1)
                continue;

            const $wFootnoteElement = cheerio.load(wFootnoteElement);

            const passOneResult = await this.__executePass1(registry, $wFootnoteElement);

            if (passOneResult.isErr()) {
                error = passOneResult.error;
                break;
            }

            result.push(passOneResult.value);
        }

        if (error)
            return new Err(error);

        return new Ok(result);
    }

    /**
     * Executes the first pass of the conversion process for a given element.
     * 
     * @param {DocxElementConverterRegistry} registry - The registry of element converters to be used for the conversion.
     * @param {CheerioAPI | undefined} $elem - The element to be converted.
     * 
     * @returns {Promise<Result<CoTreeNode, Error>>} - A Promise that resolves to a Result containing the converted CoTreeNode element if successful,
     *          or rejects with an error if the conversion fails.
     */
    private async __executePass1(registry: DocxElementConverterRegistry, $elem: CheerioAPI | undefined): Promise<Result<CoTreeNode, Error>> {
        if (!$elem)
            return new Ok(new CoTreeNode(""));

        const documentConverter = registry.getConverter($elem);

        if (!documentConverter)
            return new Ok(new CoTreeNode(""));

        const executResult = await documentConverter.execute($elem);

        if (executResult.isErr())
            return executResult;

        return new Ok(executResult.value);
    }

    /**
     * Executes the last pass of the conversion process.
     *
     * @param {CoDocument} coDocument - The CoDocument to be converted to HTML.
     * @param {IConfig} config - The configuration settings for the conversion process.
     *
     * @returns {Promise<Result<string, Error>>} - A Promise that resolves to a Result containing the HTML string if successful,
     *          or rejects with an error if the conversion fails.
     */
    private async __executePass99(coDocument: CoDocument, config: IConfig): Promise<Result<string, Error>> {
        const coTreeToHtmlConverter = new CoDocumentToHtmlConverter({
            config,
            input: coDocument,
        });

        const converterResult = await coTreeToHtmlConverter.execute();

        if (converterResult.isErr())
            return converterResult;

        let html = converterResult.value;

        if (config.outPrettyPrint.enabled)
            html = html_beautify(html, config.outPrettyPrint.options);

        return new Ok(html);
    }

    /**
     * Saves the converted document result to the specified output path.
     *
     * @param {string} outputPath - The folder path where the converted document result will be saved.
     * @param {IDocumentConverterResult} result - The document converter result containing the converted document and any associated images.
     * @param {IConfig} config - The configuration settings for the conversion process.
     *
     * @returns {Promise<Result<void, Error[]>>} - A Promise that resolves to a Result containing `void` if the save operation is successful,
     *          or rejects with an array of Erros if the save operation fails.
     */
    private async __saveResultToDisk(outputPath: string, result: IDocumentConverterResult, config: IConfig): Promise<Result<void, Error[]>> {
        const resultSaver = new DocumentConverterResultSaver(outputPath, config);
        return resultSaver.execute(result);
    }
};
