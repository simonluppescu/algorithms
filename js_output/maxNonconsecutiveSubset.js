/**
 * Category: ARRAYS
 * Tags: algorithms recursion iteration memoization
 *
 * Given an array of positive or negative integers, find the subset of the array where no two elements are adjacent
 * and whose values sum to the greatest amount.
 * For example, [-2, 1, 3, -4, 5], the subset is [3, 5] so the answer is 8.
 */
import { assert } from "console";
class MaxSubsetSolver {
    array;
    memos;
    constructor(arr) {
        this.array = arr;
    }
    solveRecursively() {
        this.memos = new Map();
        return this.solveHelper(0);
    }
    solveHelper(index) {
        if (index >= this.array.length)
            return 0;
        if (this.memos.has(index))
            return this.memos.get(index);
        const first = this.array[index] + this.solveHelper(index + 2);
        const second = this.solveHelper(index + 1);
        const result = Math.max(first, second);
        this.memos.set(index, result);
        return result;
    }
    solveIteratively() {
        this.memos = new Map();
        if (this.array.length === 2)
            return Math.max(this.array[0], this.array[1]);
        if (this.array.length === 1)
            return this.array[0];
        if (this.array.length === 0)
            return 0;
        let currMax = Math.max(this.array[0], this.array[1]);
        this.memos.set(0, this.array[0]);
        this.memos.set(1, currMax);
        for (let i = 2; i < this.array.length; i++) {
            currMax = Math.max(this.array[i], this.array[i] + this.memos.get(i - 2), currMax);
            this.memos.set(i, currMax);
        }
        return currMax;
    }
}
assert(new MaxSubsetSolver([1, -4, -5, 3, -2, -9, 5]).solveIteratively() === 9);
assert(new MaxSubsetSolver([2, 2, 2, 2, 2]).solveIteratively() === 6);
assert(new MaxSubsetSolver([-1, -1, -1, -1, 4, 3]).solveIteratively() === 4);
assert(new MaxSubsetSolver([8]).solveIteratively() === 8);
console.log("All assertions passed.");
