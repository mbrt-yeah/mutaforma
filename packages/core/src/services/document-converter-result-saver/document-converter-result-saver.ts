import { ensureDir, writeFile } from "fs-extra";
import { Err, Ok, Result } from "ts-results-es";
import { IAsset, IConfig, IDocumentConverterResult } from "@mtfm/core-models";
import { join } from "node:path";
import { to } from "await-to-js";

import { IDocumentConverterResultSaver } from "./i-document-converter-result-saver.js";

export class DocumentConverterResultSaver implements IDocumentConverterResultSaver {
    private __config: IConfig;
    private __outputPath: string;

    public constructor(outputPath: string, config: IConfig) {
        this.__config = config;
        this.__outputPath = outputPath;
    }

    public get config(): IConfig {
        return this.__config;
    }

    public get outputPath(): string {
        return this.__outputPath;
    }

    public async execute(fileConverterResult: IDocumentConverterResult): Promise<Result<void, Error[]>> {
        const errors: Error[] = [];

        const saveDocumentResult = await this.__saveDocument(this.__outputPath, fileConverterResult.document);

        if (saveDocumentResult.isErr())
            errors.push(saveDocumentResult.error);

        const saveImagesResult = await this.__saveImages(this.__outputPath, fileConverterResult.images, this.config);

        if (saveImagesResult.isErr())
            errors.push(...saveImagesResult.error);

        if (errors.length > 0)
            return new Err(errors);

        return new Ok(undefined);
    }

    private async __saveDocument(outputPath: string, document: IAsset): Promise<Result<void, Error>> {
        return this.__saveAsset(outputPath, document);
    }

    private async __saveImages(outputPath: string, images: IAsset[], config: IConfig): Promise<Result<void, Error[]>> {
        const errors: Error[] = [];
        const outputPathFinal = (config.outImgFolderName) ? join(outputPath, config.outImgFolderName) : outputPath;

        for(const image of images) {
            const saveAssetResult = await this.__saveAsset(outputPathFinal, image);

            if (saveAssetResult.isErr())
                errors.push(saveAssetResult.error);
        }

        if (errors.length > 0)
            return new Err(errors);

        return new Ok(undefined);
    }

    private async __saveAsset(outputPath: string, asset: IAsset): Promise<Result<void, Error>> {
        const [ensureDirError] = await to(ensureDir(outputPath));

        if (ensureDirError)
            return new Err(ensureDirError);

        let buffer = Buffer.from(asset.data, asset.dataEncoding);
        const namePlusExt = `${asset.name}.${asset.ext}`;

        const [writeFileError] = await to(writeFile(join(outputPath, namePlusExt), buffer));

        if (writeFileError)
            return new Err(writeFileError);

        return new Ok(undefined);
    }
};
