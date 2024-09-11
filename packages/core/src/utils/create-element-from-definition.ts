import { IElementDefinition } from "@mtfm/core-models";

export function createElementFromDefinition(
    elementDefinition: IElementDefinition,
    contents?: string | undefined,
) {
    let attrsSerialized: string | undefined;

    if (elementDefinition.attrs) {
        let resultArr: string[] = [];

        for (let [name, value] of Object.entries(elementDefinition.attrs))
            resultArr.push(`${name}="${value}"`);

        attrsSerialized = resultArr.join(" ");
    }

    const name = elementDefinition.name;
    const contentsFinal = contents ?? elementDefinition.content ?? "";

    if (!attrsSerialized)
        return `<${name}>${contentsFinal}</${name}>`;

    return `<${name} ${attrsSerialized}>${contentsFinal}</${name}>`;
};
