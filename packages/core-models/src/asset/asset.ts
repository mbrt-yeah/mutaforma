import { IAsset } from "./i-asset";
import { IAssetOpts } from "./i-asset-opts.js";

export class Asset implements IAsset {
    public id: string;
    public data: string;
    public dataEncoding: BufferEncoding;
    public name: string;
    public ext: string;

    public constructor(opts: IAssetOpts = {}) {
        this.id = opts.id || "";
        this.data = opts.data || "";
        this.dataEncoding = opts.dataEncoding || "utf-8";
        this.name = opts.name || "";
        this.ext = opts.ext || "";
    }
};
