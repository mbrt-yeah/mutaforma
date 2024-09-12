import { CoNote, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";
import { convertDecimalTo } from "../../../utils/convert-decimal-to.js";

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

        let num = convertDecimalTo(Number.parseInt(input.id), input.numberingStyle);
        let result = "";

        if (input.type === "footnote") {
            const numElem = createElementFromDefinition(this.config.footnotesNumbering.element, num);
            result += numElem + convertResult.value;

            if (this.config.footnotesListItem.enabled)
                result = createElementFromDefinition(this.config.footnotesListItem.element, result);
        }

        if (input.type === "endnote") {
            const numElem = createElementFromDefinition(this.config.endnotesNumbering.element, num);
            result += numElem + convertResult.value;

            if (this.config.endnotesListItem.enabled)
                result = createElementFromDefinition(this.config.endnotesListItem.element, result);
        }

        return new Ok(result);
    }
};
