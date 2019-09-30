"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryTree = /** @class */ (function () {
    function BinaryTree(root) {
        if (root === void 0) { root = new BinaryTreeNode(0, null, null); }
        this.root = root;
    }
    BinaryTree.prototype.print = function () {
        var printNode = function (node) {
            if (node.left)
                printNode(node.left);
            console.log(node.value);
            if (node.right)
                printNode(node.right);
        };
        printNode(this.root);
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
    }
    return BinaryTreeNode;
}());
exports.BinaryTreeNode = BinaryTreeNode;
exports.default = BinaryTree;
