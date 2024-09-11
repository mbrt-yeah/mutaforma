import { CoHeading, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";

export class CoHeadingConverter extends ACoConverter<CoHeading> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoHeading): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        if (input.mapping)
            return new Ok(createElementFromDefinition(input.mapping.element, convertResult.value));

        const level = (input.indentationLevel !== undefined) ? input.indentationLevel + 1 : 1;
        return new Ok(`<h${level}>${convertResult.value}</h${level}>`);
    }
};
