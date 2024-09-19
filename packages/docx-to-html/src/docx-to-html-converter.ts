import { ADocConverter, CoDocumentToHtmlConverter, DocxLoader } from "@mtfm/core";
import { Asset, CoDocument, CoNote, DocConverterResult, IConfig, ICoNote, IDoc, IDocConverterResult } from "@mtfm/core-models";
import { deepmerge } from "deepmerge-ts";
import { DocxToHtmlConfigDefault } from "@mtfm/core-configs";
import { Err, Ok, Result } from "ts-results-es";
import * as cheerio from "cheerio";

import { IDocxToHtmlConverterOpts } from "./i-docx-to-html-converter-opts.js";
import { DocxElementConverterRegistry } from "./docx-element-converter-registry.js";

export class DocxToHtmlConverter extends ADocConverter<string | Buffer, IDocConverterResult> {
    private __coDocumentToHtmlConverter: CoDocumentToHtmlConverter;

    public constructor(opts: IDocxToHtmlConverterOpts = {}) {
        let finalConfig: IConfig = DocxToHtmlConfigDefault;

        if (opts.config)
            finalConfig = deepmerge(DocxToHtmlConfigDefault, opts.config) as IConfig;

        super({
            outputPath: opts.outputPath,
            config: finalConfig,
            docLoader: new DocxLoader()
        });

        this.__coDocumentToHtmlConverter = new CoDocumentToHtmlConverter({ 
            outputPath: opts.outputPath,
            config: finalConfig
        });
    }

    public async execute(input: string | Buffer): Promise<Result<IDocConverterResult, Error>> {
        if (!this._docLoader) {
            const error = new Error("No document loader provided."); 
            this.emit("loadingDocError", error);
            return new Err(error);
        }

        this.emit("loadingDocStart");

        const docLoaderResult = await this._docLoader.execute(input);

        if (docLoaderResult.isErr()) {
            this.emit("loadingDocError", docLoaderResult.error);
            return docLoaderResult;
        }

        this.emit("loadingDocSuccess");

        const docLoaded = docLoaderResult.value;
        const registry = new DocxElementConverterRegistry(this.config, docLoaded);

        this.emit("convertingDocStart");

        const convertContentsResult = await this.__convertContents(docLoaded, registry);

        if (convertContentsResult.isErr()) {
            this.emit("convertingDocError", convertContentsResult.error);
            return convertContentsResult;
        }

        let coDocument = convertContentsResult.value;
        coDocument = this.__handleMetadata(coDocument, docLoaded, this.config);

        const convertEndnotesResult = await this.__convertNotes(docLoaded, registry, "w\\:endnote");
        
        if (convertEndnotesResult.isErr()) {
            this.emit("convertingDocError", convertEndnotesResult.error);
            return convertEndnotesResult;
        }

        coDocument.addEndnotes(convertEndnotesResult.value);

        const convertFootnotesResult = await this.__convertNotes(docLoaded, registry, "w\\:footnote");
        
        if (convertFootnotesResult.isErr()) {
            this.emit("convertingDocError", convertFootnotesResult.error);
            return convertFootnotesResult;
        }

        coDocument.addFootnotes(convertFootnotesResult.value);

        const toHtmlConverterResult = await this.__coDocumentToHtmlConverter.execute(coDocument);

        if (toHtmlConverterResult.isErr())
            return toHtmlConverterResult;

        this.emit("convertingDocSuccess");

        const result = new DocConverterResult({
            document: new Asset({
                data: toHtmlConverterResult.value,
                dataEncoding: "utf-8",
                name: this.config.outDocFileName,
                ext: this.config.outDocExt,
            }),
            images: Object.values(docLoaded.images) || [],
        });

        if (this.outputPath !== undefined) {
            this.emit("savingOutputStart");

            const resultSaverResult = await this._resultSaver.execute(result);

            if (resultSaverResult.isErr()) {
                for(const error of resultSaverResult.error)
                    this.emit("savingOutputError", error);
            }

            this.emit("savingOutputSuccess");
        }

        return new Ok(result);
    }

    private async __convertContents(doc: IDoc, registry: DocxElementConverterRegistry): Promise<Result<CoDocument, Error>> { 
        const $ = cheerio.load(doc.contents, {
            xmlMode: true,
            xml: {
                lowerCaseTags: false,
                lowerCaseAttributeNames: false,
            },
        });
        
        const documentConverter = registry.getConverter($);

        if (!documentConverter)
            return new Ok(new CoDocument());

        const executResult = await documentConverter.execute($);

        if (executResult.isErr())
            return executResult;

        return new Ok(executResult.value as CoDocument);
    }

    private async __convertNotes(doc: IDoc, registry: DocxElementConverterRegistry, noteElementName: string): Promise<Result<ICoNote[], Error>> {
        const $ = cheerio.load(doc.footnotes, {
            xmlMode: true,
            xml: {
                lowerCaseTags: false,
                lowerCaseAttributeNames: false,
            },
        });

        const $wFootnotes = $(":root").find(noteElementName);

        const result: ICoNote[] = [];
        let error: Error | undefined = undefined;

        for(let i = 0; i < $wFootnotes.length; i++) {
            const wFootnoteElement = $wFootnotes[i];

            if (!wFootnoteElement || ["separator", "continuationSeparator"].indexOf(wFootnoteElement.attribs["w:type"] || "") !== -1)
                continue;

            const $wFootnoteElement = cheerio.load(wFootnoteElement);
            const elementConverter = registry.getConverter($wFootnoteElement);

            if (!elementConverter)
                continue;

            const executResult = await elementConverter.execute($wFootnoteElement);

            if (executResult.isErr()) {
                error = executResult.error;
                break;
            }

            result.push(executResult.value as CoNote);
        }

        if (error)
            return new Err(error);

        return new Ok(result);
    }

    private __handleMetadata(coDocument: CoDocument, doc: IDoc, config: IConfig): CoDocument {
        if (!config.metadata.enabled)
            return coDocument;

        if (config.metadata.mode === "custom") {
            coDocument.title = config.metadata.title;
            coDocument.addMetadata(config.metadata.custom); 
        }

        if (config.metadata.mode === "document") {
            coDocument.title = doc.metadataCore["dc:title"] ?? "";
            
            for (const [key, value] of Object.entries(doc.metadataCore)) {
                if (key === "dc:title")
                    continue;

                let keyFinal = key;

                if (config.metadata.mappings && config.metadata.mappings[key])
                    keyFinal = config.metadata.mappings[key];

                coDocument.addMetadatum(keyFinal,value);
            }
        }

        if (config.metadata.mode === "custom-and-document") {
            coDocument.title = doc.metadataCore["dc:title"] ?? config.metadata.title ?? "";

            const metadataDoc: Record<string, string> = {};

            for (const [key, value] of Object.entries(doc.metadataCore)) {
                if (key === "dc:title")
                    continue;

                let keyFinal = key;

                if (config.metadata.mappings && config.metadata.mappings[key])
                    keyFinal = config.metadata.mappings[key];

                metadataDoc[keyFinal] = value;
            }

            coDocument.addMetadata(deepmerge(metadataDoc, config.metadata.custom));
        }

        return coDocument;
    }
};
