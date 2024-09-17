import { CoList, CoListItem, CoTreeNode } from "@mtfm/core-models";
import { Ok, Result } from "ts-results-es";

import { ICoListCreator } from "./i-co-list-creator.js";
import { ICoListCreatorOpts } from "./i-co-list-creator-opts.js";

export class CoListCreator implements ICoListCreator {
    public input: CoTreeNode;

    public constructor(opts: ICoListCreatorOpts = {}) {
        this.input = opts.input || new CoTreeNode("");
    }

    public async execute(): Promise<Result<CoTreeNode, Error>> {
        this.input = this.__wrapListItemsInList(this.input);
        this.input = this.__nestLists(this.input);
        this.input = this.__determineNumbering(this.input);
        return new Ok(this.input);
    }

    private __wrapListItemsInList(coTreeNode: CoTreeNode): CoTreeNode {
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
        return this.input;
    }

    private __nestLists(coTreeNode: CoTreeNode): CoTreeNode {
        for (let i = 0; i < coTreeNode.childNodes.length; i++) {
            const childNode = coTreeNode.childNodes[i];

            if (childNode instanceof CoList) {
                coTreeNode.childNodes[i] = this.__nestList(childNode, 0);
            }
        }

        return coTreeNode;
    }

    private __nestList(coList: CoList, indentationLevelCurr: number): CoList {

        /**
         * Find idx positions of all sublist items
         */

        const idxsSublists: number[][] = [];
        let currentlyInSublist = false;
        let idxsSublistCurrent: number[] = [];
        
        for (let i = 0; i < coList.childNodes.length; i++) {
            const next = coList.childNodes[i+1] as CoListItem;

            if (next && next.indentationLevel !== undefined) {
                if (next.indentationLevel > indentationLevelCurr) {
                    if (!currentlyInSublist)
                        currentlyInSublist = true

                    idxsSublistCurrent.push(i+1);
                }
                    
                if (next.indentationLevel === indentationLevelCurr) {
                    idxsSublists.push(idxsSublistCurrent);
                    currentlyInSublist = false;
                    idxsSublistCurrent = [];
                }
            }
        }

        if (currentlyInSublist)
            idxsSublists.push(idxsSublistCurrent);

        /**
         * Wrap sublist items in CoList element
         * and attach it to parent list
         */

        let idxsCoListToRemove: number[] = [];

        for (const idxsSublist of idxsSublists) {
            let coSubList = new CoList();

            for (const idx of idxsSublist) {
                if (coList.childNodes[idx])
                    coSubList.addChildNodes(coList.childNodes[idx]);

                if (idxsSublist.indexOf(idx) > 0)
                    idxsCoListToRemove.push(idx);
            }

            if (idxsSublist[0])
                coList.childNodes[idxsSublist[0]] = this.__nestList(coSubList, indentationLevelCurr + 1);
        }

        coList.removeChildNodesAtManyPos(idxsCoListToRemove);

        idxsCoListToRemove = [];

        for (let i = 0; i < coList.childNodes.length; i++) {
            const curr = coList.childNodes[i];
            const next = coList.childNodes[i+1] as CoListItem;

            if (curr && next && next instanceof CoList) {
                curr.addChildNodes(next);
                idxsCoListToRemove.push(i+1);
            }
        }

        coList.removeChildNodesAtManyPos(idxsCoListToRemove);

        return coList;
    }

    private __determineNumbering(coTreeNode: CoTreeNode): CoTreeNode {
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

        return coTreeNode;
    }
};
