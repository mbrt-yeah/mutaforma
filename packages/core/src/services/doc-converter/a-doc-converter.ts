import { EventEmitter } from "@baileyherbert/events";
import { IConfig } from "@mtfm/core-models";
import { Result } from "ts-results-es";

import { DocConverterResultSaver } from "../doc-converter-result-saver/doc-converter-result-saver.js";
import { IDocConverter } from "./i-doc-converter.js";
import { IDocConverterOpts } from "./i-doc-converter-opts.js";
import { IDocConverterResultSaver } from "../doc-converter-result-saver/i-doc-converter-result-saver.js";
import { IDocLoader } from "../doc-loader/i-doc-loader.js";
import { TDocConverterEvents } from "./t-doc-converter-events.js"

export abstract class ADocConverter<TInput, TOutput> extends EventEmitter<TDocConverterEvents> implements IDocConverter<TOutput> {
    private __outputPath: string | undefined;
    private __config: IConfig;

    protected _docLoader: IDocLoader | undefined;
    protected _resultSaver: IDocConverterResultSaver;

    public constructor(opts: IDocConverterOpts) {
        super();
        this.__outputPath = opts.outputPath;
        this.__config = opts.config;
        this._docLoader = opts.docLoader;
        this._resultSaver = new DocConverterResultSaver(this.__outputPath || "", this.__config);
    }

    public abstract execute(input: TInput): Promise<Result<TOutput, Error>>;

    public get outputPath(): string | undefined {
        return this.__outputPath;
    }

    public get config(): IConfig {
        return this.__config;
    }
};
