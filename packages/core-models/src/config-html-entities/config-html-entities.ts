import { EncodeOptions } from "he";

import { IConfigHtmlEntities } from "./i-config-html-entities.js";
import { IConfigHtmlEntitiesOpts } from "./i-config-html-entities-opts.js";

export class ConfigHtmlEntities implements IConfigHtmlEntities {
    private __enabled: boolean;
    private __options: EncodeOptions;

    public constructor(opts: IConfigHtmlEntitiesOpts = {}) {
        this.__enabled = (opts.enabled !== undefined) ? opts.enabled : true;
        this.__options = opts.options || {}
    }

    public get enabled(): boolean {
        return this.__enabled;
    }

    public get options(): EncodeOptions {
        return this.__options;
    }
};
