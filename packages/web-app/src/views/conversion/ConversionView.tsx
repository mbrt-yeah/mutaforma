import { Button, Group } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useLocation } from "react-router";
import { useState } from "react";

import classes from "./conversion-view.module.css";

import { AllowedConversions } from "../../allowed-conversions";
import { AppShell } from "../../components/app-shell/AppShell";
import { getFromAndToParamsFromLocation } from "../../utils/get-from-and-to-params-from-location";
import { InputDropzone } from "../../components/input-dropzone/InputDropzone";
import { IUploadableFile } from "../../models/uploadable-file/i-uploadable-file";
import { readFileAsArrayBuffer } from "../../utils/read-file-as-array-buffer";
import { UploadableFile } from "../../models/uploadable-file/uploadable-file";

export function ConversionView() {
    const location = useLocation();
    const fromAndToParams = getFromAndToParamsFromLocation(location);
    const fromMimeType = AllowedConversions.getMimeTypeForFromByFileExtension(fromAndToParams.from);

    const [inputFiles, setInputFiles] = useState<FileWithPath[]>([]);

    const handleCancel = function(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        return setInputFiles([]);
    }

    const handleDrop = function(files: FileWithPath[]) {
        for (const file of files) {
            const fileExisting = inputFiles.find(fileExisting => fileExisting.path === file.path && fileExisting.size === file.size);

            if (!fileExisting)
                setInputFiles([...inputFiles, file]);
        }
    }

    const handleStart = async function(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        let error: Error | undefined = undefined;
        const files: IUploadableFile[] = [];

        for (const inputFile of inputFiles) {
            const readResult = await readFileAsArrayBuffer(inputFile);

            if (readResult.isErr()) {
                error = readResult.error
                break;
            }

            files.push(new UploadableFile({
                name: inputFile.name,
                size: inputFile.size,
                data: readResult.value
            }));
        }

        if (error) {
            // TODO handle error
            console.error(error);
        }

        // TODO handle file upload
        console.log(files);
    }

    return (
        <AppShell>
            <div className={classes.dropZoneWrapper}>
                <InputDropzone
                    inputExtension={fromAndToParams.from}
                    inputMimeType={fromMimeType}
                    handleDrop={handleDrop}
                />
                {
                    inputFiles.length > 0 && <ul className={classes.dropZoneFileList}>
                        {
                            inputFiles.map((file, _) => (
                                <li key={file.path}>
                                    {file.path} ({file.size} bytes)
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            <Group justify="center">
                <Button variant="filled" color="teal" type="button" onClick={handleStart} disabled={inputFiles.length === 0}>Start conversion</Button>
                <Button variant="outline" color="red" type="button" onClick={handleCancel}>Cancel</Button>
            </Group>
        </AppShell>
    )
};