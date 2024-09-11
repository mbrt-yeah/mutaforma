import { IConversionIoDescriptionOpts } from "./i-conversion-io-description-opts.js";
import { IConversionIoDescription } from "./i-conversion-io-description.js";

export class ConversionIoDescription implements IConversionIoDescription {
    private __fileExtension: string;
    private __mimeType: string;
    private __name: string;

    public constructor(opts: IConversionIoDescriptionOpts = {}) {
        this.__fileExtension = opts.fileExtension || "";
        this.__mimeType = opts.mimeType || "";
        this.__name = opts.name || "";
    }

    public get fileExtension(): string {
        return this.__fileExtension;
    }

    public get mimeType(): string {
        return this.__mimeType;
    }

    public get name(): string {
        return this.__name;
    }
};
