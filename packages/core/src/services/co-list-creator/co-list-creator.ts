import { Ok, Result } from "ts-results-es";

import { CoList, CoListItem, CoTreeNode } from "@mtfm/core-models";
import { ICoListCreator } from "./i-co-list-creator.js";
import { ICoListCreatorOpts } from "./i-co-list-creator-opts.js";

export class CoListCreator implements ICoListCreator {
    public input: CoTreeNode;

    public constructor(opts: ICoListCreatorOpts = {}) {
        this.input = opts.input || new CoTreeNode("");
    }

    public async execute(): Promise<Result<CoTreeNode, Error>> {
        const wrapListItemsInListResult = await this.__wrapListItemsInList(this.input);

        if (wrapListItemsInListResult.isErr())
            return wrapListItemsInListResult;

        const nestListsResult = await this.__nestLists(wrapListItemsInListResult.value);

        if (nestListsResult.isErr())
            return nestListsResult;

        return this.__determineNumbering(nestListsResult.value);
    }

    private async __wrapListItemsInList(coTreeNode: CoTreeNode): Promise<Result<CoTreeNode, Error>> {
        let listItemsUnnested: CoListItem[] = [];
        const positions: number[] = [];

        for (let i = 0; i < coTreeNode.childNodes.length; i++) {
            const childNode = coTreeNode.childNodes[i];

            if (childNode instanceof CoListItem) {
                listItemsUnnested.push(childNode);

                const nextChildNode = coTreeNode.childNodes[i+1];

                if (!nextChildNode || ! (nextChildNode instanceof CoListItem) ) {
                    const list = new CoList();
                    list.addChildNodes(listItemsUnnested);
                    coTreeNode.childNodes[i] = list;
                    listItemsUnnested = [];
                } else {
                    positions.push(i);
                }
            }
        }

        coTreeNode.removeChildNodesAtManyPos(positions);
        return new Ok(this.input);
    }

    private async __nestLists(coTreeNode: CoTreeNode): Promise<Result<CoTreeNode, Error>> {
        for (let i = 0; i < coTreeNode.childNodes.length; i++) {
            const childNode = coTreeNode.childNodes[i];

            if (childNode instanceof CoList) {
                // TODO implement nesting logic
            }
        }

        return new Ok(coTreeNode);
    }

    private async __determineNumbering(coTreeNode: CoTreeNode): Promise<Result<CoTreeNode, Error>> {
        for (const childNode of coTreeNode.childNodes) {
            if (childNode instanceof CoList) {
                const numberingFormatCounts: { [numberingFormatName: string]: number } = {};

                for (const liElement of childNode.childNodes) {
                    if (liElement instanceof CoListItem && liElement.numberingFormat) {
                        if ( !numberingFormatCounts[liElement.numberingFormat] ) {
                            numberingFormatCounts[liElement.numberingFormat] = 0;
                        }

                        // TODO fix Object is possibly undefined error
                        // numberingFormatCounts[liElement.numberingFormat] += 1;
                    }
                }

                let max = 0;
                let numberingFormatFinal: string | undefined = undefined;

                for (const numberingFormatName in numberingFormatCounts) {
                    const counts = numberingFormatCounts[numberingFormatName]
                    if (counts && counts > max) {
                        max = counts;
                        numberingFormatFinal = numberingFormatName;
                    }
                }

                childNode.numberingFormat = numberingFormatFinal || "unknown";
            }
        }

        return new Ok(coTreeNode);
    }
};
