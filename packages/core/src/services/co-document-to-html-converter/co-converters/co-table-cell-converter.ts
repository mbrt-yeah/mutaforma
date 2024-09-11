import { CoTableCell, IConfig } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ACoConverter } from "./a-co-converter.js";
import { CoConverterRegistry } from "../co-converter-registry.js";

export class CoTableCellConverter extends ACoConverter<CoTableCell> {
    public constructor(
        config: IConfig,
        elementConverterRegistry: CoConverterRegistry
    ) {
        super(config, elementConverterRegistry);
    }

    public async execute(coTableCell: CoTableCell): Promise<Result<string, Error>> {
        if (coTableCell.merge === true)
            return new Ok("");

        const children = await this._convertChildNodes(coTableCell);

        if (children.isErr())
            return children;

        let colspanAttr = "";
        let rowspanAttr = "";

        if (coTableCell.colSpan && coTableCell.colSpan > 0)
            colspanAttr = ` colspan="${coTableCell.colSpan}"`;

        if (coTableCell.rowSpan && coTableCell.rowSpan > 0)
            rowspanAttr = ` rowspan="${coTableCell.rowSpan}"`;

        return new Ok(`<td${colspanAttr}${rowspanAttr} data-merge="${coTableCell.merge}">${children.value}</td>`);
    }
};
