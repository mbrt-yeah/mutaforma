import { Result } from "ts-results-es";

import { Document } from "../../models/document/document.js";
import { IDocumentContentExtractor } from "../document-content-extractor/i-document-content-extractor.js";
import { IDocumentContentLoader } from "../document-content-loader/i-document-content-loader.js";
import { IDocumentContentPartsHandler } from "../document-content-parts-handler/i-document-content-parts-handler.js";
import { IDocumentLoader } from "./i-document-loader";

export class DocumentLoader implements IDocumentLoader {
    private __contentExtractor: IDocumentContentExtractor<any>;
    private __contentLoader: IDocumentContentLoader;
    private __contentPartsHandler: IDocumentContentPartsHandler;

    public constructor(
        contentExtractor: IDocumentContentExtractor<any>,
        contentLoader: IDocumentContentLoader,
        contentPartsHandler: IDocumentContentPartsHandler,
    ) {
        this.__contentExtractor = contentExtractor;
        this.__contentLoader = contentLoader;
        this.__contentPartsHandler = contentPartsHandler;
    }

    public async execute(): Promise<Result<Document, Error>> {
        const loaderResult = await this.__contentLoader.execute();

        if (loaderResult.isErr())
            return loaderResult;

        const extractorResult = await this.__contentExtractor.execute(loaderResult.value);

        if (extractorResult.isErr())
            return extractorResult;

        return this.__contentPartsHandler.execute(extractorResult.value);
    }
};
