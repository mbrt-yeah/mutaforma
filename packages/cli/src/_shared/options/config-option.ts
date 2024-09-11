import { IOptionBlueprint } from "../../models/option-blueprint/i-option-blueprint.js";
import { OptionBlueprint } from "../../models/option-blueprint/option-blueprint.js";

interface IConfigOption {
    c?: string;
    config?: string;
};

const ConfigOptionBlueprint: IOptionBlueprint = new OptionBlueprint({
    dataType: "string",
    description: "Absolute or relative path to the configuration file",
    longFlag: "config",
    shortFlag: "c",
});

export { IConfigOption, ConfigOptionBlueprint };
