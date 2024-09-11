import { AElementConverter } from "./a-element-converter.js";
import { IConfig } from "./config/i-config.js";

export abstract class AElementConverterRegistry<TInput> {
    private __config: IConfig;

    public constructor(config: IConfig) {
        this.__config = config;
    }

    public get config(): IConfig {
        return this.__config;
    }

    public abstract getConverter(elementOrElementName: TInput): AElementConverter<any, any> | undefined;
};
