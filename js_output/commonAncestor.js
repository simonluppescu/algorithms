"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binaryTree_1 = require("./binaryTree");
/**
 * This algorithm is not optimal because it looks through nodes multiple times.
 */
var Finder = /** @class */ (function () {
    function Finder(value1, value2) {
        this.p = value1;
        this.q = value2;
    }
    Finder.prototype.findAncestor = function (bt) {
        if (this.p === this.q)
            return this.p;
        if (bt === null)
            return null;
        var pIsOnLeft = this.foundNode(bt.left, this.p);
        var qIsOnRight = this.foundNode(bt.right, this.q);
        if (pIsOnLeft && qIsOnRight) {
            return bt.value;
        }
        else if (!pIsOnLeft) {
            return this.findAncestor(bt.right);
        }
        else if (!qIsOnRight) {
            return this.findAncestor(bt.left);
        }
    };
    Finder.prototype.foundNode = function (bt, value) {
        if (bt === null)
            return false;
        if (bt.value === value)
            return true;
        return this.foundNode(bt.left, value) || this.foundNode(bt.right, value);
    };
    return Finder;
}());
var bt = binaryTree_1.default.generateBT();
var f = new Finder(1, 1);
console.log(f.findAncestor(bt.root));
