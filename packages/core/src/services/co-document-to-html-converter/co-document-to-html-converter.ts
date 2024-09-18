import { CoDocument } from "@mtfm/core-models";
import { html_beautify } from "js-beautify";
import { Ok, Result } from "ts-results-es";

import { ADocConverter } from "../doc-converter/a-doc-converter.js";
import { CoConverterRegistry } from "./co-converter-registry.js";
import { IDocConverterOpts } from "../doc-converter/i-doc-converter-opts.js";

export class CoDocumentToHtmlConverter extends ADocConverter<CoDocument, string> {
    public constructor(opts: IDocConverterOpts) {
        super(opts);
    }

    public async execute(input: CoDocument): Promise<Result<string, Error>> {
        const converterRegistry = new CoConverterRegistry(this.config);
        const converter = converterRegistry.getConverter(input);

        if (!converter)
            return new Ok("");

        const converterResult = await converter.execute(input);

        if (converterResult.isErr())
            return converterResult;

        let html = converterResult.value;

        if (this.config.outPrettyPrint.enabled)
            html = html_beautify(html, this.config.outPrettyPrint.options);

        return new Ok(html);
    }
};
