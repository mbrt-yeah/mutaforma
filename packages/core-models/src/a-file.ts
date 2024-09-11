export abstract class AFile {
    private  __filePath: string;

    public constructor(filePath: string) {
        this.__filePath = filePath;
    }

    public get filePath(): string {
        return this.__filePath;
    }

    public set filePath(filePath: string) {
        this.__filePath = filePath;
    }
};
