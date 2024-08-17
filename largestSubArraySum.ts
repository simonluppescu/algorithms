/**
 * Category: ARRAYS
 * Tags: arrays math
 *
 * You are given an array of integers (both positive and negative). Find the
 * contiguous sequence with the largest sum. Return the sum.
 *
 */

import assert from "./utils/assert.js";

function largestSubArraySum(nums: Array<number>): number {
  let maxSum = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (maxSum < sum) {
      maxSum = sum;
    } else if (sum < 0) {
      sum = 0;
    }
  }

  return maxSum;
}

assert(largestSubArraySum([3, 2, 9, -6, 12, -10, 13, 2, 3, 2]) === 30);
console.log("All assertions passed.");
