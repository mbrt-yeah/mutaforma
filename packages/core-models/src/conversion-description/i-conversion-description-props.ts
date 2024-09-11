import { IConfigurationSectionDescription } from "../configuration-section-description/i-configuration-section-description.js";
import { IConversionIoDescription } from "../conversion-io-description/i-conversion-io-description.js";

export interface IConversionDescriptionProps {
    from: IConversionIoDescription;
    to: IConversionIoDescription;
    allowedConfigurations: IConfigurationSectionDescription[];
};
