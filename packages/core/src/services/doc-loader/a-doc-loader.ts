import { IDoc } from "@mtfm/core-models";
import { Result } from "ts-results-es";

import { IDocContentExtractor } from "../doc-content-extractor/i-doc-content-extractor.js";
import { IDocContentHandler } from "../doc-content-handler/i-doc-content-handler.js";
import { IDocContentLoader } from "../doc-content-loader/i-doc-content-loader.js";
import { IDocLoader } from "./i-doc-loader.js";

export abstract class ADocLoader implements IDocLoader {
    protected readonly _contentExtractor: IDocContentExtractor<any>;
    protected readonly _contentLoader: IDocContentLoader;
    protected readonly _contentPartsHandler: IDocContentHandler;

    public constructor(
        contentExtractor: IDocContentExtractor<any>,
        contentLoader: IDocContentLoader,
        contentPartsHandler: IDocContentHandler,
    ) {
        this._contentExtractor = contentExtractor;
        this._contentLoader = contentLoader;
        this._contentPartsHandler = contentPartsHandler;
    }

    public abstract execute(...args: any[]): Promise<Result<IDoc, Error>>;
};
