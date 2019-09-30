/**
 * Check if a Binary Tree is a Binary Search Tree
 */

import * as assert from "assert";

import BinaryTree, { BinaryTreeNode } from "./utils/binaryTree";

function isBST(bt: BinaryTree): boolean {
  const node = bt.root;
  return compareLeft(node.value, node.left) && compareRight(node.value, node.right);
}

function compareLeft(value: string | number, node: BinaryTreeNode): boolean {
  if (value >= node.value) {
    let result = true;
    if (node.left) {
      result = result && compareLeft(node.value, node.left);
    }
    if (node.right) {
      result = result && compareRight(node.value, node.right);
    }
    return result;
  } else {
    return false;
  }
}

function compareRight(value: string | number, node: BinaryTreeNode): boolean {
  if (value <= node.value) {
    let result = true;
    if (node.left) {
      result = result && compareLeft(node.value, node.left);
    }
    if (node.right) {
      result = result && compareRight(node.value, node.right);
    }
    return result;
  } else {
    return false;
  }
}

const bst = BinaryTree.generateBST();

assert(isBST(bst) === true);

const bt = BinaryTree.generateBT();

assert(isBST(bt) === false);

console.log("All tests passed.");
