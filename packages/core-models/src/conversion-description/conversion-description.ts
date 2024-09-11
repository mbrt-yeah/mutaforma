import { ConversionIoDescription } from "../conversion-io-description/conversion-io-description.js";
import { IConfigurationSectionDescription } from "../configuration-section-description/i-configuration-section-description.js";
import { IConversionDescription } from "./i-conversion-description.js";
import { IConversionDescriptionOpts } from "./i-conversion-description-opts.js";
import { IConversionIoDescription } from "../conversion-io-description/i-conversion-io-description.js";

export class ConversionDescription implements IConversionDescription {
    private __from: IConversionIoDescription;
    private __to: IConversionIoDescription;
    private __allowedConfigurations: IConfigurationSectionDescription[];

    public constructor(opts: IConversionDescriptionOpts = {}) {
        this.__from = opts.from || new ConversionIoDescription();
        this.__to = opts.to || new ConversionIoDescription();
        this.__allowedConfigurations = opts.allowedConfigurations || [];
    }

    public get from(): IConversionIoDescription {
        return this.__from;
    }

    public get to(): IConversionIoDescription {
        return this.__to;
    }

    public get allowedConfigurations(): IConfigurationSectionDescription[] {
        return this.__allowedConfigurations;
    }
};
