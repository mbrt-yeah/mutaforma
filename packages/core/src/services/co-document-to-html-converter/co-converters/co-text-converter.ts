import { CoText, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";
import * as he from "he";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

export class CoTextConverter extends ACoConverter<CoText> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoText): Promise<Result<string, Error>> {
        let finalValue = input.value;

        if (this.config.outHtmlEntities.enabled === true)
            finalValue = he.encode(input.value, this.config.outHtmlEntities.options);

        return new Ok(finalValue);
    }
};
