import { IConfigurationSectionDescription } from "./i-configuration-section-description.js";
import { IConfigurationSectionDescriptionOpts } from "./i-configuration-section-description-opts.js";
import { TConfigurationCategories } from "../t-configuration-categories.js";

export class ConfigurationSectionDescription implements IConfigurationSectionDescription {
    private __category: TConfigurationCategories;
    private __name: string;

    public constructor(opts: IConfigurationSectionDescriptionOpts = {}) {
        this.__category = opts.category || "unknown";
        this.__name = opts.name || "";
    }

    public get category(): TConfigurationCategories {
        return this.__category;
    }

    public get name(): string {
        return this.__name;
    }
};