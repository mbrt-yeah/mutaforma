import { TMetadataModes } from "./t-metadata-modes";

export interface IConfigMetadata {
    enabled: boolean;
    mode: TMetadataModes;
    charset: string;
    title: string;
    mappings: Record<string, string>;
    custom: Record<string, string>;
};
