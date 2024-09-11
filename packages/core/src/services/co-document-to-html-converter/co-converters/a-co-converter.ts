import { AElementConverter, CoTreeNode, IConfig } from "@mtfm/core-models";
import { Err, Ok, Result } from "ts-results-es";

import { CoConverterRegistry } from "../co-converter-registry.js";

export abstract class ACoConverter<TInput> extends AElementConverter<TInput, string> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry)
    }

    protected async _convertChildNodes(input: CoTreeNode): Promise<Result<string, Error>> {
        let error: Error | undefined = undefined;
        let result: string = "";

        for(let i = 0; i < input.childNodes.length; i++) {
            const childNode = input.childNodes[i] as CoTreeNode;
            const childNodeConverter = this.elementConverterRegistry.getConverter(childNode);

            if (!childNodeConverter)
                continue;

            const childNodeConverterResult = await childNodeConverter.execute(childNode);

            if (childNodeConverterResult.isErr()) {
                error = childNodeConverterResult.error;
                break;
            }

            result += childNodeConverterResult.value;
        }

        if (error)
            return new Err(error);

        return new Ok(result);
    } 
};
