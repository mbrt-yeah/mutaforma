import { Result } from "ts-results-es";

import { AElementConverterRegistry } from "./a-element-converter-registry.js";
import { IConfig } from "./config/i-config.js";
import { IExecutable } from "./i-executable.js";

export abstract class AElementConverter<TInput, TOutput> implements IExecutable<TOutput> {
    private __config: IConfig;
    private __elementConverterRegistry: AElementConverterRegistry<any>;

    public constructor(
        config: IConfig,
        elementConverterRegistry: AElementConverterRegistry<any>
    ) {
        this.__config = config;
        this.__elementConverterRegistry = elementConverterRegistry;
    }

    public abstract execute(input: TInput): Promise<Result<TOutput, Error>>;

    public get config(): IConfig {
        return this.__config;
    }

    public get elementConverterRegistry(): AElementConverterRegistry<any> {
        return this.__elementConverterRegistry;
    }
};
