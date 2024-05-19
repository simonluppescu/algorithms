/**
 * Category: ARRAYS
 * Tags: searching binary_search sorted_arrays
 *
 * Given a sorted array of distinct integers and a target value, return the index if the target
 * is found. If not, return the index where it would be if it were inserted in order.
 */
import assert from "./utils/assert.js";

function searchInsert(nums: number[], target: number): number {
  let upperBound = nums.length;
  let lowerBound = 0;
  let currIndex = Math.floor((upperBound - 1 + lowerBound) / 2);
  let currValue = nums[currIndex];

  while (currValue !== target) {
    if (currValue < target) {
      lowerBound = currIndex + 1;
    } else if (currValue > target) {
      upperBound = currIndex;
    }

    if (lowerBound === upperBound) break;

    currIndex = Math.floor((upperBound - 1 + lowerBound) / 2);
    currValue = nums[currIndex];
  }

  return lowerBound === upperBound ? upperBound : currIndex;
}

assert(searchInsert([1, 3, 5, 6], 5) === 2);
assert(searchInsert([1, 3, 5, 6], 2) === 1);
assert(searchInsert([1, 3, 5, 6], 7) === 4);
console.log("All assertions passed.");
