"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryTree = /** @class */ (function () {
    function BinaryTree(root) {
        if (root === void 0) { root = new BinaryTreeNode(0, null, null); }
        this.root = root;
    }
    BinaryTree.prototype.printValues = function () {
        var printNode = function (node) {
            if (node.left)
                printNode(node.left);
            console.log(node.value);
            if (node.right)
                printNode(node.right);
        };
        printNode(this.root);
    };
    BinaryTree.prototype.printNodes = function () {
        var printNode = function (node, depth) {
            if (depth === void 0) { depth = 0; }
            var spacing = new Array(depth * 2).fill(" ").join("");
            return ("\nBinaryTreeNode {\n" + spacing + "  value: " + node.value + "\n" + spacing + "  left: " + (node.hasLeft() ? printNode(node.left, depth + 1) : "null") + "\n" + spacing + "  right: " + (node.hasRight() ? printNode(node.right, depth + 1) : "null") + "\n" + spacing + "}").trim();
        };
        console.log(printNode(this.root));
    };
    BinaryTree.randomBST = function () {
        var root = new BinaryTreeNode(50, null, null);
        for (var i = 0; i < 25; i++) {
            var value = Math.floor(Math.random() * 100) + 1;
            var currNode = root;
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
    };
    BinaryTree.generateBST = function () {
        var left = new BinaryTreeNode(3, new BinaryTreeNode(2, new BinaryTreeNode(1, null, null), null), new BinaryTreeNode(4, null, null));
        var right = new BinaryTreeNode(8, new BinaryTreeNode(6, null, null), new BinaryTreeNode(9, null, null));
        var node = new BinaryTreeNode(5, left, right);
        return new this(node);
    };
    BinaryTree.generateBT = function () {
        var left = new BinaryTreeNode(1, new BinaryTreeNode(2, new BinaryTreeNode(3, null, null), null), new BinaryTreeNode(4, null, null));
        var right = new BinaryTreeNode(5, new BinaryTreeNode(6, null, null), new BinaryTreeNode(7, null, null));
        var node = new BinaryTreeNode(8, left, right);
        return new this(node);
    };
    return BinaryTree;
}());
var BinaryTreeNode = /** @class */ (function () {
    function BinaryTreeNode(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.isVisited = false;
    }
    BinaryTreeNode.prototype.hasLeft = function () {
        return this.left && !this.left.isVisited;
    };
    BinaryTreeNode.prototype.hasRight = function () {
        return this.right && !this.right.isVisited;
    };
    BinaryTreeNode.prototype.visit = function () {
        this.isVisited = true;
    };
    return BinaryTreeNode;
}());
exports.BinaryTreeNode = BinaryTreeNode;
exports.default = BinaryTree;
