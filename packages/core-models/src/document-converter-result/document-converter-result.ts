import { Asset } from "../asset/asset.js";
import { IAsset } from "../asset/i-asset.js";
import { IDocumentConverterResult } from "./i-document-converter-result.js";
import { IDocumentConverterResultOpts } from "./i-document-converter-result-opts.js";

export class DocumentConverterResult implements IDocumentConverterResult {
    private __images: IAsset[];
    private __document: IAsset;

    public constructor(opts: IDocumentConverterResultOpts = {}) {
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
