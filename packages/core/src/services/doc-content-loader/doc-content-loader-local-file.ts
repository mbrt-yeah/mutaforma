import { Err, Ok, Result } from "ts-results-es";
import { readFile } from "node:fs";

import { IDocContentLoader } from "./i-doc-content-loader";

export class DocContentLoaderLocalFile implements IDocContentLoader {
    public async execute(filePath: string): Promise<Result<Buffer, Error>> {
        return new Promise((resolve) => {
            readFile(filePath, (err, buffer) => {
                if (err) 
                    return resolve(new Err(err));

                return resolve(new Ok(buffer));
            });
        });
    }
};
