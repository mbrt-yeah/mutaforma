import { CoBreak, CoParagraph, CoTextRun, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";

export class CoParagraphConverter extends ACoConverter<CoParagraph> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoParagraph): Promise<Result<string, Error>> {
        if (this.config.outRemoveEmptyParas && this.__isEmpty(input))
            return new Ok("");

        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        if (input.mapping)
            return new Ok(createElementFromDefinition(input.mapping.element, convertResult.value));

        return new Ok(`<p>${convertResult.value}</p>`);
    }

    private __isEmpty(input: CoParagraph): boolean {
        return input.childNodesTotal === 0 || this.__containsEmptyTextRuns(input) || this.__containsSingleBreak(input);
    }

    private __containsEmptyTextRuns(input: CoParagraph): boolean {
        let result = true;

        for (const childNode of input.childNodes) {
            if (childNode instanceof CoTextRun && childNode.childNodesTotal > 0) {
                result = false;
                break;
            }
        }

        return result;
    }

    private __containsSingleBreak(input: CoParagraph): boolean {
        return input.childNodesTotal === 1 && 
               input.childNodes[0] instanceof CoTextRun && 
               input.childNodes[0].childNodesTotal === 1 &&
               input.childNodes[0].childNodes[0] instanceof CoBreak;
    }
};
