import { FileWithPath } from "@mantine/dropzone";

export interface IInputDropzoneProps {
    inputExtension: string | undefined;
    inputMimeType: string | undefined;
    handleDrop: (files: FileWithPath[]) => void;
};
