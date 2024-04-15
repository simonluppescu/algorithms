/**
 * Category: ARRAYS
 * Tags: binary_search sorted_arrays
 *
 * Given a sorted array of n integers that has been rotated an unknown number of times,
 * write code to find an element in the array.
 */
import { assert } from "console";

function findInt(nums: Array<number>, target: number): number {
  const newNums = nums.concat(nums);
  let min = 0;
  for (let i = 1; i < newNums.length; i++) {
    if (newNums[i] < newNums[i - 1]) {
      min = i;
      break;
    }
  }
  const max = min + nums.length - 1;

  let upper = max;
  let lower = min;
  while (upper !== lower) {
    let mid = Math.floor((upper + lower) / 2);
    if (newNums[mid] === target) {
      return mid % nums.length;
    } else if (target > newNums[mid]) {
      lower = mid + 1;
    } else if (target < newNums[mid]) {
      upper = mid;
    }
  }

  return newNums[upper] === target ? upper : -1;
}

function findIntWithModulo(nums: Array<number>, target: number): number {
  let min = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      min = i;
      break;
    }
  }
  const max = (min + nums.length - 1) % nums.length;

  let upper = max;
  let lower = min;
  while (upper !== lower) {
    let mid = Math.floor((upper + nums.length + lower) / 2) % nums.length;
    if (nums[mid] === target) {
      return mid;
    } else if (target > nums[mid]) {
      lower = mid + 1;
    } else if (target < nums[mid]) {
      upper = mid;
    }
  }

  return nums[upper] === target ? upper : -1;
}

function checkBoth(nums: Array<number>, target: number, expected: number): boolean {
  return findInt(nums, target) === expected && findIntWithModulo(nums, target) === expected;
}

assert(checkBoth([15, 17, 19, 20, 21, 1, 3, 6, 12], 17, 1));
assert(checkBoth([15, 17, 19, 20, 21, 1, 3, 6, 12], 12, 8));
assert(checkBoth([15, 17, 19, 20, 21, 1, 3, 6, 12], 15, 0));
assert(checkBoth([15, 17, 19, 20, 21, 1, 3, 6, 12], 9, -1));
assert(checkBoth([1], 1, 0));
assert(checkBoth([1], 2, -1));

console.log("All assertions passed.");
