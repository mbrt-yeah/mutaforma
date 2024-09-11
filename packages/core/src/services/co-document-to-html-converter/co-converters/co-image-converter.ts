import { CoImage, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

export class CoImageConverter extends ACoConverter<CoImage> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(image: CoImage): Promise<Result<string, Error>> {
        let srcAttrVal = `${image.name}.${image.ext}`;

        if (this.config.outImgFolderName && this.config.outImgFolderName !== "")
            srcAttrVal = `${this.config.outImgFolderName}/${srcAttrVal}`;

        return new Ok(`<img src="${srcAttrVal}" width="${image.width}" height="${image.height}" alt="${image.desc}" />`);
    }
};
