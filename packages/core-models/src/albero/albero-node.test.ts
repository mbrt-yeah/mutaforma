import { describe, expect, it } from "@jest/globals";

import { AlberoNode } from "./albero-node.js";
import { ParagraphTest } from "./.test/paragraph-test.js";
import { TextRunTest } from "./.test/text-run-test.js";

describe(`${AlberoNode.name}`, () => {
    describe("#cstr", () => {
        it(`should instantiate ${AlberoNode.name} successfully`, () => {
            const instance = new AlberoNode();

            expect(instance).not.toBeUndefined();
            expect(instance).not.toBeNull();
            expect(instance).toBeInstanceOf(AlberoNode);
            expect(instance.childNodes).toEqual([]);
            expect(instance.childNodesTotal).toBe(0);
            expect(instance.lastChildNodePos).toBe(-1);
        });
    });

    describe("#addChildNodes", () => {
        it(`should add one child node successfully`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();

            parent.addChildNodes(childOne);

            expect(parent.childNodesTotal).toBe(1);
            expect(parent.lastChildNodePos).toBe(0);
        });

        it(`should add two child nodes successfully`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);

            expect(parent.childNodesTotal).toBe(2);
            expect(parent.lastChildNodePos).toBe(1);
        });
    });

    describe("#addChildNodesAtPos", () => {
        it(`should add one child node when parent has zero child nodes`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();

            parent.addChildNodesAtPos(childOne, 0);
            expect(parent.childNodesTotal).toBe(1);
            expect(parent.lastChildNodePos).toBe(0);
            expect(parent.childNodes[0] === childOne).toBe(true);
        });

        it(`should add two child nodes when parent has zero child nodes`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();

            parent.addChildNodesAtPos([childOne, childTwo], 0);
            expect(parent.childNodesTotal).toBe(2);
            expect(parent.lastChildNodePos).toBe(1);
            expect(parent.childNodes[0] === childOne).toBe(true);
        });

        it(`should add one child node BEFORE first and second child node`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();
            const childThree = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);

            parent.addChildNodesAtPos(childThree, 0);
            expect(parent.childNodesTotal).toBe(3);
            expect(parent.lastChildNodePos).toBe(2);
            expect(parent.childNodes[0] === childThree).toBe(true);
        });

        it(`should add two child nodes BEFORE first and second child node`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();
            const childThree = new AlberoNode();
            const childFour = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);

            parent.addChildNodesAtPos([childThree, childFour], 0);
            expect(parent.childNodesTotal).toBe(4);
            expect(parent.lastChildNodePos).toBe(3);
            expect(parent.childNodes[0] === childThree).toBe(true);
            expect(parent.childNodes[1] === childFour).toBe(true);
        });

        it(`should add one child node BETWEEN first and second child node`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();
            const childThree = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);

            parent.addChildNodesAtPos(childThree, 1);
            expect(parent.childNodesTotal).toBe(3);
            expect(parent.lastChildNodePos).toBe(2);
            expect(parent.childNodes[1] === childThree).toBe(true);
        });

        it(`should add two child nodes BETWEEN first and second child node`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();
            const childThree = new AlberoNode();
            const childFour = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);

            parent.addChildNodesAtPos([childThree, childFour], 1);
            expect(parent.childNodesTotal).toBe(4);
            expect(parent.lastChildNodePos).toBe(3);
            expect(parent.childNodes[1] === childThree).toBe(true);
            expect(parent.childNodes[2] === childFour).toBe(true);
        });

        it(`should add one child node AFTER first and second child node`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();
            const childThree = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);

            parent.addChildNodesAtPos(childThree, 2);
            expect(parent.childNodesTotal).toBe(3);
            expect(parent.lastChildNodePos).toBe(2);
            expect(parent.childNodes[2] === childThree).toBe(true);
        });

        it(`should add two child nodes AFTER first and second child node`, async () => {
            const parent = new AlberoNode();
            const childOne = new AlberoNode();
            const childTwo = new AlberoNode();
            const childThree = new AlberoNode();
            const childFour = new AlberoNode();

            parent.addChildNodes([childOne, childTwo]);
            parent.addChildNodesAtPos([childThree, childFour], 3);

            expect(parent.childNodesTotal).toBe(4);
            expect(parent.lastChildNodePos).toBe(3);
            expect(parent.childNodes[2] === childThree).toBe(true);
            expect(parent.childNodes[3] === childFour).toBe(true);
        });
    });

    describe("#findChildNodesByType", () => {
        it(`should find zero instances of type ${ParagraphTest.name}`, async () => {
            const parent = new AlberoNode();
            const results = parent.findChildNodesByType(ParagraphTest);

            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(0);
        });

        it(`should find one instance of type ${ParagraphTest.name}`, async () => {
            const parent = new AlberoNode();
            const para = new ParagraphTest();

            parent.addChildNodes(para);
            
            const results = parent.findChildNodesByType(ParagraphTest);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(1);

            for (const result of results)
                expect(result instanceof ParagraphTest).toBe(true);
        });

        it(`should find two instances of type ${ParagraphTest.name}`, async () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();

            parent.addChildNodes([paraOne, paraTwo]);

            const results = parent.findChildNodesByType(ParagraphTest);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(2);

            for (const result of results)
                expect(result instanceof ParagraphTest).toBe(true);
        });

        it(`should find two instances of type ${ParagraphTest.name} and first instance should contain once instance of ${TextRunTest.name}`, async () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();
            const textRun = new TextRunTest();

            parent.addChildNodes([paraOne, paraTwo]);
            parent.childNodes[0].addChildNodes(textRun);

            const results = parent.findChildNodesByType(ParagraphTest);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(2);

            for (const result of results)
                expect(result instanceof ParagraphTest).toBe(true);

            const resultsTextRun = results[0].findChildNodesByType(TextRunTest);
            expect(Array.isArray(resultsTextRun)).toBe(true);
            expect(resultsTextRun.length).toBe(1);

            for (const resultTextRun of resultsTextRun)
                expect(resultTextRun instanceof TextRunTest).toBe(true);
        });
    });

    describe("#findDescendantNodesByType", () => {
        it(`should find four instances of type ${ParagraphTest.name} and that are located at different levels`, async () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();
            const paraThree = new ParagraphTest();
            const paraFour = new ParagraphTest();

            paraThree.addChildNodes(paraFour);
            paraOne.addChildNodes([paraTwo, paraThree]);
            parent.addChildNodes(paraOne);

            const results = parent.findDescendantNodesByType(ParagraphTest);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(4);

            for (const result of results)
                expect(result instanceof ParagraphTest).toBe(true);

            expect(results[0]).toEqual(paraOne);
            expect(results[1]).toEqual(paraTwo);
            expect(results[2]).toEqual(paraThree);
            expect(results[3]).toEqual(paraFour);
        });
    });

    describe("#replaceAllChildNodes", () => {
        it(`should replace all two child nodes of type ${ParagraphTest.name} with one node of type ${TextRunTest.name}`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();
            const textRunOne = new TextRunTest();

            parent.addChildNodes([paraOne, paraTwo]);
            parent.replaceAllChildNodes([textRunOne]);

            expect(parent.childNodesTotal).toBe(1);
            expect(parent.lastChildNodePos).toBe(0);

            for (const childNode of parent.childNodes)
                expect(childNode instanceof TextRunTest).toBe(true);
        });

        it(`should replace all two child nodes of type ${ParagraphTest.name} with two nodes of type ${TextRunTest.name}`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();
            const textRunOne = new TextRunTest();
            const textRunTwo = new TextRunTest();

            parent.addChildNodes([paraOne, paraTwo]);
            parent.replaceAllChildNodes([textRunOne, textRunTwo]);

            expect(parent.childNodesTotal).toBe(2);
            expect(parent.lastChildNodePos).toBe(1);

            for (const childNode of parent.childNodes)
                expect(childNode instanceof TextRunTest).toBe(true);
        });

        it(`should replace the only one child nodes of type ${ParagraphTest.name} with two nodes of type ${TextRunTest.name}`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const textRunOne = new TextRunTest();
            const textRunTwo = new TextRunTest();

            parent.addChildNodes([paraOne]);
            parent.replaceAllChildNodes([textRunOne, textRunTwo]);

            expect(parent.childNodesTotal).toBe(2);
            expect(parent.lastChildNodePos).toBe(1);

            for (const childNode of parent.childNodes)
                expect(childNode instanceof TextRunTest).toBe(true);
        });
    });

    describe("#removeChildNodeAtPos", () => {
        it(`should return undefined when there are no child nodes and removal position is arbitrary`, () => {
            const parent = new AlberoNode();
            const result = parent.removeChildNodeAtPos(3);

            expect(result).toBe(undefined);
        });

        it(`should remove one child node at position 0 when one child node is given`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();

            parent.addChildNodes([paraOne]);
            const result = parent.removeChildNodeAtPos(0);

            expect(parent.childNodesTotal).toBe(0);
            expect(parent.lastChildNodePos).toBe(-1);
            expect(result === paraOne).toBe(true);
        });

        it(`should remove one child node at position 1 when two child nodes are given`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();

            parent.addChildNodes([paraOne, paraTwo]);
            const result = parent.removeChildNodeAtPos(1);

            expect(parent.childNodesTotal).toBe(1);
            expect(parent.lastChildNodePos).toBe(0);
            expect(result === paraTwo).toBe(true);
        });
    });

    describe("#removeChildNodesAtManyPos", () => {
        it(`should return an empty array when there are no child nodes and removal positions are arbitrary`, () => {
            const parent = new AlberoNode();
            const result = parent.removeChildNodesAtManyPos([0,1,2,3]);

            expect(result).toEqual([]);
        });

        it(`should remove one child node at position 0 when two child nodes are given`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();

            parent.addChildNodes([paraOne, paraTwo]);
            const parasRemoved = parent.removeChildNodesAtManyPos([0]);

            expect(parent.childNodesTotal).toBe(1);
            expect(parent.lastChildNodePos).toBe(0);
            expect(parent.childNodes[0] === paraTwo).toBe(true);
            expect(Array.isArray(parasRemoved)).toBe(true);
            expect(parasRemoved.length).toBe(1);
            expect(parasRemoved[0] === paraOne).toBe(true);
        });

        it(`should remove two child node at position 0 and 1 when two child nodes are given`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();

            parent.addChildNodes([paraOne, paraTwo]);
            const parasRemoved = parent.removeChildNodesAtManyPos([0,1]);

            expect(parent.childNodesTotal).toBe(0);
            expect(parent.lastChildNodePos).toBe(-1);
            expect(Array.isArray(parasRemoved)).toBe(true);
            expect(parasRemoved.length).toBe(2);
            expect(parasRemoved[0] === paraOne).toBe(true);
            expect(parasRemoved[1] === paraTwo).toBe(true);
        });

        it(`should remove two child node at position 0 and 2 and 4 when five child nodes are given`, () => {
            const parent = new AlberoNode();
            const paraOne = new ParagraphTest();
            const paraTwo = new ParagraphTest();
            const paraThree = new ParagraphTest();
            const paraFour = new ParagraphTest();
            const paraFive = new ParagraphTest();

            parent.addChildNodes([paraOne, paraTwo, paraThree, paraFour, paraFive]);
            const parasRemoved = parent.removeChildNodesAtManyPos([0,2,4]);

            expect(parent.childNodesTotal).toBe(2);
            expect(parent.lastChildNodePos).toBe(1);
            expect(parent.childNodes[0] === paraTwo).toBe(true);
            expect(parent.childNodes[1] === paraFour).toBe(true);
            expect(Array.isArray(parasRemoved)).toBe(true);
            expect(parasRemoved.length).toBe(3);
            expect(parasRemoved[0] === paraOne).toBe(true);
            expect(parasRemoved[1] === paraThree).toBe(true);
            expect(parasRemoved[2] === paraFive).toBe(true);
        });
    });
});