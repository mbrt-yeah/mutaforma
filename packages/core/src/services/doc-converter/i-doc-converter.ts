import { IExecutable } from "@mtfm/core-models";
import { IDocConverterProps } from "./i-doc-converter-props.js";

export interface IDocConverter<TOutput> extends IDocConverterProps, IExecutable<TOutput> {};
