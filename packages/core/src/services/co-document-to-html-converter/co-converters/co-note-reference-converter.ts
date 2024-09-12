import { CoNoteReference, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { convertDecimalTo } from "../../../utils/convert-decimal-to.js";

export class CoNoteReferenceConverter extends ACoConverter<CoNoteReference> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoNoteReference): Promise<Result<string, Error>> {
        const number = convertDecimalTo(Number.parseInt(input.id), input.numberingStyle);
        return new Ok(`<sup>${number}</sup>`);
    }
};
