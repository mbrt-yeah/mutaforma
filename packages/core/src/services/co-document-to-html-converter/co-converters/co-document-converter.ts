import { CoDocument, IConfig, ICoNote } from "@mtfm/core-models";
import { Err, Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";
import { createElementFromDefinition } from "../../../utils/create-element-from-definition.js";

export class CoDocumentConverter extends ACoConverter<CoDocument> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(input: CoDocument): Promise<Result<string, Error>> {
        const convertResult = await this._convertChildNodes(input);

        if (convertResult.isErr())
            return convertResult;

        let footnotesHtml = "";
        let endnotesHtml = "";

        if (input.footnotes.length > 0) {
            const convertFootnotesResult = await this.__convertNotes(input.footnotes);

            if (convertFootnotesResult.isErr())
                return convertFootnotesResult;

            if (this.config.footnotesList.enabled)
                footnotesHtml = createElementFromDefinition(this.config.footnotesList.element, convertFootnotesResult.value);
            else
                footnotesHtml = convertFootnotesResult.value;

            if (this.config.footnotesHeading.enabled) {
                const footnotesHeadingHtml = createElementFromDefinition(this.config.footnotesHeading.element);
                footnotesHtml = footnotesHeadingHtml + footnotesHtml;
            }

            if (this.config.footnotesWrapper.enabled)
                footnotesHtml = createElementFromDefinition(this.config.footnotesWrapper.element, footnotesHtml);
        }

        if (input.endnotes.length > 0) {
            const convertEndnotesResult = await this.__convertNotes(input.endnotes);

            if (convertEndnotesResult.isErr())
                return convertEndnotesResult;

            if (this.config.endnotesList.enabled)
                endnotesHtml = createElementFromDefinition(this.config.endnotesList.element, convertEndnotesResult.value);
            else
                endnotesHtml = convertEndnotesResult.value;

            if (this.config.endnotesHeading.enabled) {
                const endnotesHeadingHtml = createElementFromDefinition(this.config.endnotesHeading.element);
                endnotesHtml = endnotesHeadingHtml + endnotesHtml;
            }

            if (this.config.endnotesWrapper.enabled)
                endnotesHtml = createElementFromDefinition(this.config.endnotesWrapper.element, endnotesHtml);
        }

        let metaDataHtml = "";

        if (input.title)
            metaDataHtml += `<title>${input.title}</title>`;

        for (const [key, value] of Object.entries(input.metadata))
            metaDataHtml += `<meta name="${key}" content="${value}" />`;

        return new Ok(`<!DOCTYPE html><html><head>${metaDataHtml}</head><body>${convertResult.value}${footnotesHtml}${endnotesHtml}</body></html>`);
    }

    private async __convertNotes(notes: ICoNote[]): Promise<Result<string, Error>> {
        let notesHtml = "";
        let error: Error | undefined = undefined;

        for (const note of notes) {
            const coTreeNodeConverter = this.elementConverterRegistry.getConverter(note);

            if (!coTreeNodeConverter)
                continue;

            const converterResult = await coTreeNodeConverter.execute(note);

            if (converterResult.isErr()) {
                error = converterResult.error;
                break;
            }

            notesHtml += converterResult.value;
        }

        if (error)
            return new Err(error);

        return new Ok(notesHtml);
    }
};
