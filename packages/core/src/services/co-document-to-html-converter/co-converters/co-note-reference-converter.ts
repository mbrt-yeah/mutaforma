import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { CoNoteReference, IConfig } from "@mtfm/core-models";

export class CoNoteReferenceConverter extends ACoConverter<CoNoteReference> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoNoteReference): Promise<Result<string, Error>> {
        return new Ok(`<sup>${input.id}</sup>`);
    }
};
