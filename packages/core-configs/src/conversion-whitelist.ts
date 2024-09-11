import { 
    ConfigurationSectionDescription,
    ConversionDescription,
    ConversionWhitelist,
    IConversionWhitelist
} from "@mtfm/core-models";

export const conversionWhitelist: IConversionWhitelist = new ConversionWhitelist({
    entries: [
        new ConversionDescription({
            from: {
                name: "Docx",
                fileExtension: "docx",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            },
            to: {
                name: "HTML",
                fileExtension: "html",
                mimeType: "text/html"
            },
            allowedConfigurations: [
                new ConfigurationSectionDescription({
                    category: "footnotes",
                    name: "Footnotes"
                }),
                new ConfigurationSectionDescription({
                    category: "endnotes",
                    name: "Endnotes"
                }),
                new ConfigurationSectionDescription({
                    category: "mappings",
                    name: "Mappings"
                }),
                new ConfigurationSectionDescription({
                    category: "output",
                    name: "Output"
                }),
            ],
        })
    ]
});