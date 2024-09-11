import { Err, Ok, Result } from "ts-results-es";
import { FileWithPath } from "@mantine/dropzone";

export const readFileAsArrayBuffer = async function(file: FileWithPath): Promise<Result<ArrayBuffer, Error>> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener("error", (event: ProgressEvent<FileReader>) => {
            return resolve(new Err(new Error(`An error occured while reading the file: ${file.name}`)));
        });

        reader.addEventListener("abort", (event: ProgressEvent<FileReader>) => {
            return resolve(new Err(new Error(`Reading of file was aborted: ${file.name}`)));
        });

        reader.addEventListener("load", (event: ProgressEvent<FileReader>) => {
            return resolve(new Ok(reader.result as ArrayBuffer));
        });

        reader.readAsArrayBuffer(file)
    });
};
