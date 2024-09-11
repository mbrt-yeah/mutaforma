import { CoList, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

export class CoListConverter extends ACoConverter<CoList> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoList): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        return new Ok(`<ul>${convertResult.value}</ul>`);
    }
};
