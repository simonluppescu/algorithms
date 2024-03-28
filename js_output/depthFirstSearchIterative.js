/**
 * Category: TREES
 * Tags: algorithms iteration
 *
 * Depth first search but perform iteratively.
 */
import BinaryTree from "./utils/binaryTree.js";
import Stack from "./utils/stack.js";
class IterativeDFS {
    constructor(bt) {
        this.tree = bt;
    }
    print() {
        const nodes = new Stack();
        let currNode = this.tree.root;
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
    }
}
const bt = BinaryTree.randomBST();
const foo = new IterativeDFS(bt);
foo.print();
