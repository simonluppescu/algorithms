import BinaryTree, { BinaryTreeNode } from "./utils/binaryTree";

/**
 * Category: TREES
 * Tags: recursion
 *
 * Given two different nodes in a tree, find the common ancestor.
 * This algorithm is not optimal because it looks through nodes multiple times.
 */
class Finder {
  p: number;
  q: number;

  constructor(value1: number, value2: number) {
    this.p = value1;
    this.q = value2;
  }

  findAncestor(bt: BinaryTreeNode): number {
    if (this.p === this.q) return this.p;
    if (bt === null) return null;

    const pIsOnLeft = this.foundNode(bt.left, this.p);
    const qIsOnRight = this.foundNode(bt.right, this.q);
    if (pIsOnLeft && qIsOnRight) {
      return bt.value;
    } else if (!pIsOnLeft) {
      return this.findAncestor(bt.right);
    } else if (!qIsOnRight) {
      return this.findAncestor(bt.left);
    }
  }

  foundNode(bt: BinaryTreeNode, value: number): boolean {
    if (bt === null) return false;
    if (bt.value === value) return true;

    return this.foundNode(bt.left, value) || this.foundNode(bt.right, value);
  }
}

const bt = BinaryTree.generateBT();
const f = new Finder(1, 1);
console.log(f.findAncestor(bt.root));
