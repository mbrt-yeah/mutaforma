import { Dropzone } from "@mantine/dropzone";
import { Group, rem, Text } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";

import classes from "./input-dropzone.module.css";

import { IInputDropzoneProps } from "./i-input-dropzone-props";
import { InputDropzoneError } from "../input-dropzone-error/InputDropzoneError";

export function InputDropzone({ handleDrop, inputExtension, inputMimeType }: IInputDropzoneProps) {
    if (!inputMimeType)
        return <InputDropzoneError title="No inputMimeType" message="No inputMimeType" />;

    return (
        <Dropzone
            accept={[inputMimeType]}
            classNames={{
                inner: classes.dropZoneInner,
                root: classes.dropZoneRoot,
            }}
            onDrop={handleDrop}
            maxSize={5 * 1024 ** 10}
        >
            <Group 
                justify="center"
                gap="xl"
                mih={220}
                style={{ pointerEvents: 'none' }}
            >
                <Dropzone.Accept>
                    <Group align="center" justify="center">
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-teal-6)' }}
                            stroke={1.5}
                        />
                        <div>
                            <Text size="xl" inline>
                                Accepted
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                This look good. Release your mouse button to upload the file.
                            </Text>
                        </div>
                    </Group>
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <Group align="center" justify="center">
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                        <div>
                            <Text size="xl" inline>
                                Not allowed
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Either the file is too large or it not a *.{inputExtension} file.
                            </Text>
                        </div>
                    </Group>
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <Group align="center" justify="center">
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                        <div>
                            <Text size="xl" inline>
                                Drag *.{inputExtension} files here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                You can upload as many files as you like as long as they don't exceed 10 MB.
                            </Text>
                        </div>
                    </Group>
                </Dropzone.Idle>
            </Group>
        </Dropzone>
    )
};