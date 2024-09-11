import { CoTableRow, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

export class CoTableRowConverter extends ACoConverter<CoTableRow> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoTableRow): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        return new Ok(`<tr>${convertResult.value}</tr>`);
    }
};
