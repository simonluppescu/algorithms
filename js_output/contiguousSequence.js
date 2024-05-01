/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: arrays math
 *
 * You are given an array of integers (both positive and negative). Find the
 * contiguous sequence with the largest sum. Return the sum.
 */
import assert from "./utils/assert.js";
function contiguous(arr) {
    return contiguousHelper(arr, 0);
}
const memos = {};
function contiguousHelper(arr, sum) {
    if (memos[key(arr, sum)] !== undefined) {
        return memos[key(arr, sum)];
    }
    if (arr.length === 0) {
        return sum;
    }
    const result = Math.max(sum, contiguousHelper(arr.slice(1), sum + arr[0]), contiguousHelper(arr.slice(1), arr[0]));
    if (memos[key(arr, sum)] === undefined) {
        memos[key(arr, sum)] = result;
    }
    return result;
}
function key(arr, sum) {
    return `${arr.join(",")}:${sum}`;
}
assert(contiguous([2, -8, 3, -2, 4]) === 5);
assert(contiguous([2, 1, 3, -12, 2, 2, 3]) === 7);
assert(contiguous([8, -3, 3, -1]) === 8);
assert(contiguous([8, 1, -20, 9, 10, -30, 21, -29]) === 21);
// prettier-ignore
// eslint-disable-next-line max-len
assert(contiguous([1, 7, 2, 4, 6, 1, 3, -1, -3, 9, 1, -1, -2, -2, -3, 1, 2, 1, 3, 3, 1, 6, 3, 5, 6, 2, 3, 1, -10, 2]) === 59);
console.log("All assertions passed.");
