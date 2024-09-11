import { CoNote, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";

export class CoNoteConverter extends ACoConverter<CoNote> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoNote): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        // TODO implement footnote numbering

        let result = "";

        if (this.config.footnotesListItem.enabled && input.type === "footnote")
            result = createElementFromDefinition(this.config.footnotesListItem.element, convertResult.value);
        else if (this.config.endnotesListItem.enabled && input.type === "endnote")
            result = createElementFromDefinition(this.config.endnotesListItem.element, convertResult.value);
        else
            result = `<li>${convertResult.value}</li>`

        return new Ok(result);
    }
};
