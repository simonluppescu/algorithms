/**
 * Category: ARRAYS
 * Tags: easy arrays sets
 *
 * Given a non-empty array of integers nums, every element
 * appears twice except for one. Find that single one. You
 * must implement a solution with a linear runtime complexity
 * and use only constant extra space.
 */
import { assert } from "console";

function singleNumber(nums: number[]): number {
  const seen = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) {
      seen.delete(nums[i]);
    } else {
      seen.add(nums[i]);
    }
  }

  return [...seen.keys()][0];
}

assert(singleNumber([1, 2, 1]) === 2);
assert(singleNumber([4, 2, 3, 5, 2, 1, 3, 4, 1]) === 5);
assert(singleNumber([2]) === 2);
console.log("All assertions passed");
