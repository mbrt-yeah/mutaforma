import { IDocxFile, IExecutable } from "@mtfm/core-models";
import { IDocxFileLoaderProps } from "./i-docx-file-loader-props.js";

export interface IDocxFileLoader extends IDocxFileLoaderProps, IExecutable<IDocxFile> {};
