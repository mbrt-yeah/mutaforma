import { ConversionDescription, ConversionWhitelist, IConversionWhitelist } from "@mtfm/core-models";

export const AllowedConversions: IConversionWhitelist = new ConversionWhitelist({
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
        }),
        new ConversionDescription({
            from: {
                name: "ODT",
                fileExtension: "odt",
                mimeType: "application/vnd.oasis.opendocument.text"
            },
            to: {
                name: "HTML",
                fileExtension: "html",
                mimeType: "text/html"
            },
        })
    ]
});