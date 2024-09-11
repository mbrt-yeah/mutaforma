import { IConversionWhitelist } from "./i-conversion-whitelist";
import { IConverWhitelistOpts } from "./i-conversion-whitelist-opts";
import { IConversionDescription } from "../conversion-description/i-conversion-description.js";

export class ConversionWhitelist implements IConversionWhitelist {
    private __entries: IConversionDescription[]

    public constructor(opts: IConverWhitelistOpts = {}) {
        this.__entries = opts.entries || [];
    }

    public get entries(): IConversionDescription[] {
        return this.__entries;
    }

    public getConversionDescription(fromFileExtension: string, toFileExtension: string): IConversionDescription | undefined {
        return this.entries.find(entry => entry.from.fileExtension === fromFileExtension && entry.to.fileExtension === toFileExtension);
    }

    public getDistinctSources(): IConversionDescription[] {
        const results: IConversionDescription[] = [];

        for (const entry of this.entries) {
            const entryFound = results.find(resultsEntry => resultsEntry.from.fileExtension === entry.from.fileExtension);

            if (!entryFound)
                results.push(entry);
        }

        return results;
    }

    public getDistinctTargets(): IConversionDescription[] {
        const results: IConversionDescription[] = [];

        for (const entry of this.entries) {
            const entryFound = results.find(resultsEntry => resultsEntry.to.fileExtension === entry.to.fileExtension);

            if (!entryFound)
                results.push(entry);
        }

        return results;
    }

    public getMimeTypeForFromByFileExtension(fromFileExtension: string): string | undefined {
        const entry = this.__entries.find(entry => entry.from.fileExtension === fromFileExtension);

        if (!entry)
            return undefined;

        return entry.from.mimeType;
    }

    public isConversionAllowed(fromFileExtension: string, toFileExtension: string): boolean {
        const entry = this.__entries.find(entry => entry.from.fileExtension === fromFileExtension);

        if (!entry)
            return false;

        return entry.to.fileExtension === toFileExtension;
    }
};
