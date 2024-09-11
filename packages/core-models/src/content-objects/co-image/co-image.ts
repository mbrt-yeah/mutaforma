import { CoTreeNode } from "../co-tree-node.js";
import { ICoImageOpts } from "./i-co-image-opts.js";
import { ICoImageProps } from "./i-co-image-props.js";

export class CoImage extends CoTreeNode implements ICoImageProps {
    private __data: string;
    private __desc: string;
    private __ext: string;
    private __height: number;
    private __id: string;
    private __name: string;
    private __width: number;

    public constructor(opts: ICoImageOpts = {}) {
        super(CoImage.name);
        this.__data = opts.data || "";
        this.__desc = opts.desc || opts.name || "";
        this.__ext = opts.ext || "";
        this.__height = opts.height || 0;
        this.__id = opts.id || "";
        this.__name = opts.name || "";
        this.__width = opts.width || 0;
    }

    public get data(): string {
        return this.__data;
    }

    public get desc(): string {
        return this.__desc;
    }

    public get ext(): string {
        return this.__ext;
    }

    public get height(): number {
        return this.__height;
    }

    public get id(): string {
        return this.__id;
    }

    public get name(): string {
        return this.__name;
    }

    public get width(): number {
        return this.__width;
    }
};
