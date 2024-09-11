import { CoBody, CoDocument, CoList, CoListItem, CoParagraph } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";

import { CoListCreator } from "./co-list-creator.js";

describe(`${CoListCreator.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${CoListCreator.name} successfully`, () => {
            const instance = new CoListCreator();
            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(CoListCreator);
        });
    });
    describe("#execute", () => {
        it(`should wrap a single ${CoListItem.name} child of ${CoBody.name} in a ${CoList.name} element`, async () => {
            const coBody = new CoBody();
            const coListItem = new CoListItem();

            coBody.addChildNodes(coListItem);

            const coListCreator = new CoListCreator({ input: coBody, });
            const coListCreatorResult = await coListCreator.execute();

            expect(coListCreatorResult.isOk()).toBe(true);
            expect(coListCreatorResult.unwrap()).not.toBeUndefined();
            expect(coListCreatorResult.unwrap()).not.toBeNull();

            const coBodyResult = coListCreatorResult.unwrap();

            expect(coBodyResult.childNodes[0] instanceof CoList).toBe(true);
            expect(coBodyResult.childNodes[0].childNodes.length).toBe(1);
            expect(coBodyResult.childNodes[0].childNodes[0] instanceof CoListItem).toBe(true);
            expect(coBodyResult.childNodes[0].childNodes[0]).toEqual(coListItem);
            expect(coBodyResult.childNodes[0].childNodes[0].childNodes.length).toBe(0);
        });

        it(`should wrap two ${CoListItem.name} children of ${CoBody.name} situated between two ${CoParagraph.name} elements in a single ${CoList.name} element`, async () => {
            const coBody = new CoBody();
            const paraOne = new CoParagraph();
            const paraTwo = new CoParagraph();
            const coListItemOne = new CoListItem();
            const coListItemTwo = new CoListItem();

            coBody.addChildNodes([paraOne, coListItemOne, coListItemTwo, paraTwo]);

            const coListCreator = new CoListCreator({ input: coBody, });
            const coListCreatorResult = await coListCreator.execute();

            expect(coListCreatorResult.isOk()).toBe(true);
            expect(coListCreatorResult.unwrap()).not.toBeUndefined();
            expect(coListCreatorResult.unwrap()).not.toBeNull();

            const coBodyResult = coListCreatorResult.unwrap();

            expect(coBodyResult.childNodesTotal).toBe(3);
            expect(coBodyResult.childNodes[0] instanceof CoParagraph).toBe(true);
            expect(coBodyResult.childNodes[0]).toEqual(paraOne);
            expect(coBodyResult.childNodes[1] instanceof CoList).toBe(true);
            expect(coBodyResult.childNodes[1].childNodes.length).toBe(2);
            expect(coBodyResult.childNodes[1].childNodes[0]).toEqual(coListItemOne);
            expect(coBodyResult.childNodes[1].childNodes[1]).toEqual(coListItemTwo);
            expect(coBodyResult.childNodes[2] instanceof CoParagraph).toBe(true);
            expect(coBodyResult.childNodes[2]).toEqual(paraTwo);
        });
    });
});