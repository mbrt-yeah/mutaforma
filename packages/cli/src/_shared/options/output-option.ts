import { IOptionBlueprint } from "../../models/option-blueprint/i-option-blueprint.js";
import { OptionBlueprint } from "../../models/option-blueprint/option-blueprint.js";

interface IOutputOption {
    o?: string;
    output?: string;
};

const OutputOptionBlueprint: IOptionBlueprint = new OptionBlueprint({
    dataType: "string",
    description: "Absolute or relative path to output folder",
    longFlag: "output",
    shortFlag: "o",
});

export { IOutputOption, OutputOptionBlueprint };
