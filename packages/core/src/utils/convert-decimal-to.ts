import { TNoteNumberingStyles } from "@mtfm/core-models"

import { convertDecimalToRoman } from "./convert-decimal-to-roman.js";

export function convertDecimalTo(decimal: number, target: TNoteNumberingStyles): string {
    const converters: { [key in TNoteNumberingStyles]: (decimal: number) => string } = {
        "decimal": function (decimal: number): string {
            return decimal.toString();
        },
        "upper-roman": (decimal: number) => {
            return convertDecimalToRoman(decimal);
        },
        "lower-roman": function (decimal: number): string {
            return convertDecimalToRoman(decimal).toLowerCase();
        },
    };

    const converter = converters[target];

    if (!converter || typeof converter !== "function")
        return decimal.toString();

    return converter(decimal);
};