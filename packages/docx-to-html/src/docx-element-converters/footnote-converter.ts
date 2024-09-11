import { CheerioAPI } from "cheerio";
import { CoListCreator } from "@mtfm/core";
import { CoNote, IConfig, IDocxFile } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ADocxElementConverter } from "./a-docx-element-converter.js";
import { DocxElementConverterRegistry } from "../docx-element-converter-registry.js";

export class FootnoteConverter extends ADocxElementConverter<CoNote> {

        public constructor(
        config: IConfig,
        docxFile: IDocxFile,
        elementConverterRegistry: DocxElementConverterRegistry
    ) {
        super(config, docxFile, elementConverterRegistry);
    }

    public async execute($elem: CheerioAPI): Promise<Result<CoNote, Error>> {
        const createContentsResult = await this._convertContents($elem);

        if (createContentsResult.isErr())
            return createContentsResult;

        const $root = $elem(":root", $elem.html());
        const id = $root.attr("w:id") || "";

        const coNote = new CoNote({ id, type: "footnote" });
        coNote.addChildNodes(createContentsResult.value);

        const listCreator = new CoListCreator({ input: coNote });
        const listCreatorResult = await listCreator.execute();

        if (listCreatorResult.isErr())
            return listCreatorResult;

        return new Ok(listCreatorResult.value as CoNote);
    }
};