import { CoListItem, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";

export class CoListItemConverter extends ACoConverter<CoListItem> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoListItem): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        if (input.mapping)
            return new Ok(createElementFromDefinition(input.mapping.element, convertResult.value));

        return new Ok(`<li>${convertResult.value}</li>`);
    }
};
