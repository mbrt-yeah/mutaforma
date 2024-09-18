import { Asset } from "../asset/asset.js";
import { IAsset } from "../asset/i-asset.js";
import { IDocConverterResult } from "./i-doc-converter-result.js";
import { IDocConverterResultOpts } from "./i-doc-converter-result-opts.js";

export class DocConverterResult implements IDocConverterResult {
    private __images: IAsset[];
    private __document: IAsset;

    public constructor(opts: IDocConverterResultOpts = {}) {
        this.__document = opts.document || new Asset();
        this.__images = opts.images || [];
    }

    public get images(): IAsset[] {
        return this.__images;
    }

    public get document(): IAsset {
        return this.__document;
    }
};
