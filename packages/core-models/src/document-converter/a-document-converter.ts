import { EventEmitter } from "@baileyherbert/events"
import { Result } from "ts-results-es";

import { IConfig } from "../config/i-config.js";
import { IDocumentConverter } from "./i-document-converter.js";
import { IDocumentConverterOpts } from "./i-document-converter-opts.js";
import { IExecutable } from "../i-executable.js";
import { TDocumentConverterEvents } from "./t-document-converter-events.js"

export abstract class ADocumentConverter<TInput, TOutput> extends EventEmitter<TDocumentConverterEvents> implements IDocumentConverter<TInput>, IExecutable<TOutput> {
    private __input: TInput;
    private __outputPath: string | undefined;
    private __config: IConfig;

    public constructor(opts: IDocumentConverterOpts<TInput>) {
        super();
        this.__input = opts.input;
        this.__outputPath = opts.outputPath;
        this.__config = opts.config;
    }

    public abstract execute(): Promise<Result<TOutput, Error>>;

    public get input(): TInput {
        return this.__input;
    }

    public get outputPath(): string | undefined {
        return this.__outputPath;
    }

    public get config(): IConfig {
        return this.__config;
    }
};
