/**
 * Category: MATH
 * Tags: logarithms
 *
 * Given an array of integers, compute the sum of arr.map => 2^elem.
 * Then produce the shortest length of another array of integers whose sum
 * described above is equal to the same amount.
 * For example, given [1, 0, 2, 2], sum is
 * 2^1 + 2^0 + 2^2 + 2^2 = 2 + 1 + 4 + 4 = 11.
 * The shortest array with this sum is [3, 1, 0], so the answer is 3.
 */
import { assert } from "console";
class Binarian {
    memos;
    constructor() {
        this.memos = new Map();
    }
    solve(arr) {
        let binarian = 0;
        arr.forEach((value) => {
            binarian += this.computePower(value);
        });
        let count = 0;
        while (binarian > 0) {
            const exponent = Math.floor(Math.log2(binarian));
            const value = this.computePower(exponent);
            binarian -= value;
            count += 1;
        }
        return count;
    }
    computePower(value) {
        if (this.memos.has(value)) {
            return this.memos.get(value);
        }
        const result = Math.pow(2, value);
        this.memos.set(value, result);
        return result;
    }
}
const b = new Binarian();
assert(b.solve([1, 0, 2, 2]) === 3);
assert(b.solve([]) === 0);
assert(b.solve([0, 0, 0, 0, 0, 0, 0, 0]) === 1);
console.log("All assertions passed");
