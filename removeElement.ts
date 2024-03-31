/**
 * Category: ARRAYS
 * Tags: easy arrays
 *
 * Given an integer array nums and an integer val, remove all
 * occurrences of val in nums in-place. The order of the elements
 * may be changed. Then return the number of elements in nums which
 * are not equal to val.
 */
import { assert } from "console";

function removeElement(nums: Array<number>, val: number): number {
  for (let i = 0; i < nums.length; ) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    } else {
      i++;
    }
  }

  return nums.length;
}

assert(removeElement([1, 2, 3, 4, 5, 3, 4], 3) === 5);
