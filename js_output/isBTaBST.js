"use strict";
/**
 * Category: TREES
 * Tags: binary_search_trees recursion
 *
 * Check if a Binary Tree is a Binary Search Tree
 */
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var binaryTree_1 = require("./utils/binaryTree");
function isBST(bt) {
    var node = bt.root;
    return compareLeft(node.value, node.left) && compareRight(node.value, node.right);
}
function compareLeft(value, node) {
    if (value >= node.value) {
        var result = true;
        if (node.left) {
            result = result && compareLeft(node.value, node.left);
        }
        if (node.right) {
            result = result && compareRight(node.value, node.right);
        }
        return result;
    }
    else {
        return false;
    }
}
function compareRight(value, node) {
    if (value <= node.value) {
        var result = true;
        if (node.left) {
            result = result && compareLeft(node.value, node.left);
        }
        if (node.right) {
            result = result && compareRight(node.value, node.right);
        }
        return result;
    }
    else {
        return false;
    }
}
var bst = binaryTree_1.default.generateBST();
assert(isBST(bst) === true);
var bt = binaryTree_1.default.generateBT();
assert(isBST(bt) === false);
console.log("All tests passed.");
