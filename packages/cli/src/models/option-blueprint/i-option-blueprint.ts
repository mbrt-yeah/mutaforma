import { IOptionBlueprintProps } from "./i-option-blueprint-props";

export interface IOptionBlueprint extends IOptionBlueprintProps {
    get flags(): string;
};
