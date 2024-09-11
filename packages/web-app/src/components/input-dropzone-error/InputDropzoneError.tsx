import { IInputDropzoneErrorProps } from "./input-dropzone-error-props";

export function InputDropzoneError({ title, message }: IInputDropzoneErrorProps ) {
    return (
        <div>
            {title} - {message}
        </div>
    )
};