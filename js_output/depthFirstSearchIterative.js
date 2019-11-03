"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: TREES
 * Tags: algorithms iteration
 *
 * Depth first search but perform iteratively.
 */
var binaryTree_1 = require("./utils/binaryTree");
var stack_1 = require("./utils/stack");
var IterativeDFS = /** @class */ (function () {
    function IterativeDFS(bt) {
        this.tree = bt;
    }
    IterativeDFS.prototype.print = function () {
        var nodes = new stack_1.default();
        var currNode = this.tree.root;
        currNode.visit();
        nodes.push(currNode);
        while (!nodes.isEmpty()) {
            if (currNode.hasLeft()) {
                currNode = currNode.left;
                currNode.visit();
                nodes.push(currNode);
            }
            else {
                currNode = nodes.pop();
                console.log(currNode.value);
                if (!currNode.hasLeft() && currNode.hasRight()) {
                    currNode = currNode.right;
                    currNode.visit();
                    nodes.push(currNode);
                }
            }
        }
    };
    return IterativeDFS;
}());
var bt = binaryTree_1.default.randomBST();
var foo = new IterativeDFS(bt);
foo.print();
