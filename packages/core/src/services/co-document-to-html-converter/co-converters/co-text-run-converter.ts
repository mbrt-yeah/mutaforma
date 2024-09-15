import { CoTextRun, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";

export class CoTextRunConverter extends ACoConverter<CoTextRun> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoTextRun): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        let result = convertResult.value;

        if (input.isBold && this.config.inlineFormatting.bold.enabled)
            result = createElementFromDefinition(this.config.inlineFormatting.bold.element, result);

        if (input.isItalic && this.config.inlineFormatting.italic.enabled)
            result = createElementFromDefinition(this.config.inlineFormatting.italic.element, result);

        if (input.isUnderline && this.config.inlineFormatting.underline.enabled)
            result = createElementFromDefinition(this.config.inlineFormatting.underline.element, result);

        if (input.isStrikethrough && this.config.inlineFormatting.strikethrough.enabled)
            result = createElementFromDefinition(this.config.inlineFormatting.strikethrough.element, result);

        if (input.isSubscript && this.config.inlineFormatting.subscript.enabled)
            result = createElementFromDefinition(this.config.inlineFormatting.subscript.element, result);

        if (input.isSuperscript && this.config.inlineFormatting.superscript.enabled)
            result = createElementFromDefinition(this.config.inlineFormatting.superscript.element, result);

        return new Ok(result);
    }
};
