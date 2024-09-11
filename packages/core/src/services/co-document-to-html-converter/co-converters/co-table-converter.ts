import { CoTable, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

export class CoTableConverter extends ACoConverter<CoTable> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoTable): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        return new Ok(`<table>${convertResult.value}</table>`);
    }
};
