import { IOptionBlueprint } from "../../models/option-blueprint/i-option-blueprint.js";
import { OptionBlueprint } from "../../models/option-blueprint/option-blueprint.js";

interface IInputOption {
    i?: string;
    input?: string;
};

const InputOptionBlueprint: IOptionBlueprint = new OptionBlueprint({
    dataType: "string",
    description: "Absolute or relative path to input file",
    longFlag: "input",
    shortFlag: "i",
});

export { IInputOption, InputOptionBlueprint };
