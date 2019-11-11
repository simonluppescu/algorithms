"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: ARRAYS
 * Tags: algorithms recursion iteration memoization
 *
 * Given an array of positive or negative integers, find the subset of the array where no two elements are adjacent
 * and whose values sum to the greatest amount.
 * For example, [-2, 1, 3, -4, 5], the subset is [3, 5] so the answer is 8.
 */
var assert = require("assert");
var MaxSubsetSolver = /** @class */ (function () {
    function MaxSubsetSolver(arr) {
        this.array = arr;
    }
    MaxSubsetSolver.prototype.solveRecursively = function () {
        this.memos = new Map();
        return this.solveHelper(0);
    };
    MaxSubsetSolver.prototype.solveHelper = function (index) {
        if (index >= this.array.length)
            return 0;
        if (this.memos.has(index))
            return this.memos.get(index);
        var first = this.array[index] + this.solveHelper(index + 2);
        var second = this.solveHelper(index + 1);
        var result = Math.max(first, second);
        this.memos.set(index, result);
        return result;
    };
    MaxSubsetSolver.prototype.solveIteratively = function () {
        this.memos = new Map();
        if (this.array.length === 2)
            return Math.max(this.array[0], this.array[1]);
        if (this.array.length === 1)
            return this.array[0];
        if (this.array.length === 0)
            return 0;
        var currMax = Math.max(this.array[0], this.array[1]);
        this.memos.set(0, this.array[0]);
        this.memos.set(1, currMax);
        for (var i = 2; i < this.array.length; i++) {
            currMax = Math.max(this.array[i], this.array[i] + this.memos.get(i - 2), currMax);
            this.memos.set(i, currMax);
        }
        return currMax;
    };
    return MaxSubsetSolver;
}());
assert(new MaxSubsetSolver([1, -4, -5, 3, -2, -9, 5]).solveIteratively() === 9);
assert(new MaxSubsetSolver([2, 2, 2, 2, 2]).solveIteratively() === 6);
assert(new MaxSubsetSolver([-1, -1, -1, -1, 4, 3]).solveIteratively() === 4);
assert(new MaxSubsetSolver([8]).solveIteratively() === 8);
console.log("All assertions passed.");
