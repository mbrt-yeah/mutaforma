import { ADocumentConverter, CoDocument, IConfig, IDocumentConverterOpts } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { CoConverterRegistry } from "./co-converter-registry.js";

export class CoDocumentToHtmlConverter extends ADocumentConverter<CoDocument, string> {
    public constructor(opts: IDocumentConverterOpts<CoDocument>) {
        super(opts);
    }

    public async execute(): Promise<Result<string, Error>> {
        return this.__executePass1(this.input, this.config);
    }

    private async __executePass1(coDocument: CoDocument, config: IConfig): Promise<Result<string, Error>> {
        if (!coDocument)
            return new Ok("");

        const coTreeNodeConverterRegistry = new CoConverterRegistry(config);
        const coTreeNodeConverter = coTreeNodeConverterRegistry.getConverter(coDocument);

        if (!coTreeNodeConverter)
            return new Ok("");

        return await coTreeNodeConverter.execute(coDocument);
    }
};
