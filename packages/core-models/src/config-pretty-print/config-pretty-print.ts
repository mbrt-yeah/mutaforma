import { HTMLBeautifyOptions } from "js-beautify";

import { IConfigPrettyPrint } from "./i-config-pretty-print.js";
import { IConfigPrettyPrintOpts } from "./i-config-pretty-print-opts.js";

export class ConfigPrettyPrint implements IConfigPrettyPrint {
    private __enabled: boolean;
    private __options: HTMLBeautifyOptions;

    public constructor(opts: IConfigPrettyPrintOpts = {}) {
        this.__enabled = (opts.enabled !== undefined) ? opts.enabled : true;
        this.__options = opts.options || {}
    }

    public get enabled(): boolean {
        return this.__enabled;
    }

    public get options(): HTMLBeautifyOptions {
        return this.__options;
    }
};
