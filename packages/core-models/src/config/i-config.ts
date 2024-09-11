import { IStyleMapping } from "../style-mapping/i-style-mapping.js";
import { IConfigProps } from "./i-config-props.js";

export interface IConfig extends IConfigProps {
    getStyleMappingByName(name: string | undefined): IStyleMapping | undefined
};
