import { IUploadableFile } from "./i-uploadable-file";
import { IUploadableFileOpts } from "./i-uploadable-file-opts";

export class UploadableFile implements IUploadableFile {
    private __data: ArrayBuffer;
    private __name: string;
    private __size: number;
    
    public constructor(opts: IUploadableFileOpts = {}) {
        this.__data = opts.data || new ArrayBuffer(0);
        this.__name = opts.name || "";
        this.__size = opts.size || 0;
    }

    public get data(): ArrayBuffer { 
        return this.__data;
    }

    public get name(): string {
        return this.__name;
    }

    public get size(): number {
        return this.__size;
    }
}