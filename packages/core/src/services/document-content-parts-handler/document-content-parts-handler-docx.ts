import { Ok, Result } from "ts-results-es";

import { Document } from "../../models/document/document.js";
import { IDocument } from "../../models/document/i-document.js";
import { IDocumentContentPartsHandler } from "./i-document-content-parts-handler.js";

export class DocumentContentPartsHandlerDocx implements IDocumentContentPartsHandler { 

    public async execute(): Promise<Result<IDocument, Error>> {
        return new Ok(new Document());
    }
}