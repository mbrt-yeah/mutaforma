import { CoBody, CoList, CoListItem, CoParagraph, CoText } from "@mtfm/core-models";
import { describe, expect, it } from "@jest/globals";
import { stringify } from "flatted";

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

        it(`should nest a single ${CoList.name} with sublists at different levels`, async () => {
            const coBody = new CoBody();

            const coListItem1 = new CoListItem();
            coListItem1.indentationLevel = 0;
            coListItem1.addChildNodes([new CoText("List Item 1")]);

            const coListItem2 = new CoListItem();
            coListItem2.indentationLevel = 1;
            coListItem2.addChildNodes([new CoText("List Item 1.1")]);

            const coListItem3 = new CoListItem();
            coListItem3.indentationLevel = 1;
            coListItem3.addChildNodes([new CoText("List Item 1.2")]);

            const coListItem4 = new CoListItem();
            coListItem4.indentationLevel = 2;
            coListItem4.addChildNodes([new CoText("List Item 1.2.1")]);

            const coListItem5 = new CoListItem();
            coListItem5.indentationLevel = 0;
            coListItem5.addChildNodes([new CoText("List Item 2")]);

            const coListItem6 = new CoListItem();
            coListItem6.indentationLevel = 1;
            coListItem6.addChildNodes([new CoText("List Item 2.1")]);

            const coListItem7 = new CoListItem();
            coListItem7.indentationLevel = 1;
            coListItem7.addChildNodes([new CoText("List Item 2.2")]);

            coBody.addChildNodes([coListItem1, coListItem2, coListItem3, coListItem4, coListItem5, coListItem6, coListItem7]);

            const coListCreator = new CoListCreator({ input: coBody, });
            const coListCreatorResult = await coListCreator.execute();

            const coBodyResultStringified = stringify(coListCreatorResult.unwrap());
            expect(coBodyResultStringified).toBe(`[{\"__childNodes\":\"1\",\"__childNodesTotal\":1,\"__lastChildNodePos\":0,\"__nodeName\":\"2\"},[\"3\"],\"CoBody\",{\"__childNodes\":\"4\",\"__childNodesTotal\":2,\"__lastChildNodePos\":1,\"__nodeName\":\"5\",\"numberingFormat\":\"6\"},[\"7\",\"8\"],\"CoList\",\"unknown\",{\"__childNodes\":\"9\",\"__childNodesTotal\":2,\"__lastChildNodePos\":1,\"__parentNode\":\"3\",\"__nodeName\":\"10\",\"indentationLevel\":0},{\"__childNodes\":\"11\",\"__childNodesTotal\":2,\"__lastChildNodePos\":1,\"__parentNode\":\"3\",\"__nodeName\":\"10\",\"indentationLevel\":0},[\"12\",\"13\"],\"CoListItem\",[\"14\",\"15\"],{\"__childNodes\":\"16\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"7\",\"__nodeName\":\"17\",\"value\":\"18\"},{\"__childNodes\":\"19\",\"__childNodesTotal\":2,\"__lastChildNodePos\":1,\"__parentNode\":\"7\",\"__nodeName\":\"5\"},{\"__childNodes\":\"20\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"8\",\"__nodeName\":\"17\",\"value\":\"21\"},{\"__childNodes\":\"22\",\"__childNodesTotal\":2,\"__lastChildNodePos\":1,\"__parentNode\":\"8\",\"__nodeName\":\"5\"},[],\"CoText\",\"List Item 1\",[\"23\",\"24\"],[],\"List Item 2\",[\"25\",\"26\"],{\"__childNodes\":\"27\",\"__childNodesTotal\":1,\"__lastChildNodePos\":0,\"__parentNode\":\"13\",\"__nodeName\":\"10\",\"indentationLevel\":1},{\"__childNodes\":\"28\",\"__childNodesTotal\":2,\"__lastChildNodePos\":1,\"__parentNode\":\"13\",\"__nodeName\":\"10\",\"indentationLevel\":1},{\"__childNodes\":\"29\",\"__childNodesTotal\":1,\"__lastChildNodePos\":0,\"__parentNode\":\"15\",\"__nodeName\":\"10\",\"indentationLevel\":1},{\"__childNodes\":\"30\",\"__childNodesTotal\":1,\"__lastChildNodePos\":0,\"__parentNode\":\"15\",\"__nodeName\":\"10\",\"indentationLevel\":1},[\"31\"],[\"32\",\"33\"],[\"34\"],[\"35\"],{\"__childNodes\":\"36\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"23\",\"__nodeName\":\"17\",\"value\":\"37\"},{\"__childNodes\":\"38\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"24\",\"__nodeName\":\"17\",\"value\":\"39\"},{\"__childNodes\":\"40\",\"__childNodesTotal\":1,\"__lastChildNodePos\":0,\"__parentNode\":\"24\",\"__nodeName\":\"5\"},{\"__childNodes\":\"41\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"25\",\"__nodeName\":\"17\",\"value\":\"42\"},{\"__childNodes\":\"43\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"26\",\"__nodeName\":\"17\",\"value\":\"44\"},[],\"List Item 1.1\",[],\"List Item 1.2\",[\"45\"],[],\"List Item 2.1\",[],\"List Item 2.2\",{\"__childNodes\":\"46\",\"__childNodesTotal\":1,\"__lastChildNodePos\":0,\"__parentNode\":\"33\",\"__nodeName\":\"10\",\"indentationLevel\":2},[\"47\"],{\"__childNodes\":\"48\",\"__childNodesTotal\":0,\"__lastChildNodePos\":-1,\"__parentNode\":\"45\",\"__nodeName\":\"17\",\"value\":\"49\"},[],\"List Item 1.2.1\"]`);
        });
    });
});