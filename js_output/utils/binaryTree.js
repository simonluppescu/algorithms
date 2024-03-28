class BinaryTree {
    constructor(root = new BinaryTreeNode(0, null, null)) {
        this.root = root;
    }
    printValues() {
        const printNode = (node) => {
            if (node.left)
                printNode(node.left);
            console.log(node.value);
            if (node.right)
                printNode(node.right);
        };
        printNode(this.root);
    }
    printNodes() {
        const printNode = (node, depth = 0) => {
            const spacing = new Array(depth * 2).fill(" ").join("");
            return `
BinaryTreeNode {
${spacing}  value: ${node.value}
${spacing}  left: ${node.hasLeft() ? printNode(node.left, depth + 1) : "null"}
${spacing}  right: ${node.hasRight() ? printNode(node.right, depth + 1) : "null"}
${spacing}}`.trim();
        };
        console.log(printNode(this.root));
    }
    static randomBST() {
        const root = new BinaryTreeNode(50, null, null);
        for (let i = 0; i < 25; i++) {
            const value = Math.floor(Math.random() * 100) + 1;
            let currNode = root;
            while (true) {
                if (value < currNode.value) {
                    if (!currNode.hasLeft()) {
                        currNode.left = new BinaryTreeNode(value, null, null);
                        break;
                    }
                    else {
                        currNode = currNode.left;
                    }
                }
                else if (value >= currNode.value) {
                    if (!currNode.hasRight()) {
                        currNode.right = new BinaryTreeNode(value, null, null);
                        break;
                    }
                    else {
                        currNode = currNode.right;
                    }
                }
            }
        }
        return new BinaryTree(root);
    }
    static generateBST() {
        const left = new BinaryTreeNode(3, new BinaryTreeNode(2, new BinaryTreeNode(1, null, null), null), new BinaryTreeNode(4, null, null));
        const right = new BinaryTreeNode(8, new BinaryTreeNode(6, null, null), new BinaryTreeNode(9, null, null));
        const node = new BinaryTreeNode(5, left, right);
        return new this(node);
    }
    static generateBT() {
        const left = new BinaryTreeNode(1, new BinaryTreeNode(2, new BinaryTreeNode(3, null, null), null), new BinaryTreeNode(4, null, null));
        const right = new BinaryTreeNode(5, new BinaryTreeNode(6, null, null), new BinaryTreeNode(7, null, null));
        const node = new BinaryTreeNode(8, left, right);
        return new this(node);
    }
}
export class BinaryTreeNode {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.isVisited = false;
    }
    hasLeft() {
        return this.left && !this.left.isVisited;
    }
    hasRight() {
        return this.right && !this.right.isVisited;
    }
    visit() {
        this.isVisited = true;
    }
}
export default BinaryTree;
