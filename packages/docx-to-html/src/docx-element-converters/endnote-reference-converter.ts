import { CheerioAPI } from "cheerio";
import { CoNoteReference, IConfig, IDoc } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

export class EndnoteReferenceConverter extends ADocxElementConverter<CoNoteReference> {

    public constructor(
        config: IConfig,
        doc: IDoc,
        elementConverterRegistry: DocxElementConverterRegistry
    ) {
        super(config, doc, elementConverterRegistry);
    }

    public async execute($elem: CheerioAPI): Promise<Result<CoNoteReference, Error>> {
        const $root = $elem(":root", $elem.html());

        const noteReference = new CoNoteReference({
            id: $root.attr("w:id") || "",
            numberingStyle: this.config.endnotesNumbering.style,
            type: "endnote",
        });

        return new Ok(noteReference);
    }
};