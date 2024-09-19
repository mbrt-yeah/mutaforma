import { Doc, IDoc } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { DocContentHandlerDocxImages } from "./doc-content-handler-docx-images.js"; 
import { DocContentHandlerDocxNumberings} from "./doc-content-handler-docx-numberings.js";
import { DocContentHandlerDocxStyles } from "./doc-content-handler-docx-styles.js";
import { DocxContentHandlerDocxMetadataCore } from "./doc-content-handler-docx-metadata-core.js";
import { IDocContentHandler } from "../i-doc-content-handler.js";

export class DocContentHandlerDocx implements IDocContentHandler {
    private __imagesHandler: DocContentHandlerDocxImages;
    private __metadataCoreHandler: DocxContentHandlerDocxMetadataCore;
    private __numberingsHandler: DocContentHandlerDocxNumberings;
    private __stylesHandler: DocContentHandlerDocxStyles;

    public constructor() {
        this.__imagesHandler = new DocContentHandlerDocxImages();
        this.__metadataCoreHandler = new DocxContentHandlerDocxMetadataCore();
        this.__numberingsHandler = new DocContentHandlerDocxNumberings();
        this.__stylesHandler = new DocContentHandlerDocxStyles();
    }

    public async execute(archive: Record<string, string>): Promise<Result<IDoc, Error>> {
        const doc = new Doc();
        doc.contents = archive["word/document.xml"] ?? "";
        doc.endnotes = archive["word/endnotes.xml"] ?? "";
        doc.footnotes = archive["word/footnotes.xml"] ?? "";

        if (archive["word/_rels/document.xml.rels"]) {
            const imagesHandlerResult = await this.__imagesHandler.execute(archive["word/_rels/document.xml.rels"], archive);

            if (imagesHandlerResult.isErr())
                return imagesHandlerResult;

            doc.images = imagesHandlerResult.value;
        }

        if (archive["docProps/core.xml"]) {
            const metadataCoreHandlerResult = await this.__metadataCoreHandler.execute(archive["docProps/core.xml"]);

            if (metadataCoreHandlerResult.isErr())
                return metadataCoreHandlerResult;

            doc.metadataCore = metadataCoreHandlerResult.value;
        }

        if (archive["word/numbering.xml"]) {
            const numberingsHandlerResult = await this.__numberingsHandler.execute(archive["word/numbering.xml"]);

            if (numberingsHandlerResult.isErr())
                return numberingsHandlerResult;

            doc.numberings = numberingsHandlerResult.value;
        }

        if (archive["word/styles.xml"]) {
            const stylesHandlerResult = await this.__stylesHandler.execute(archive["word/styles.xml"]);

            if (stylesHandlerResult.isErr())
                return stylesHandlerResult;

            doc.styles = stylesHandlerResult.value;
        }

        return new Ok(doc);
    }
};
