/**
 * Category: MATH
 * Tags: easy math
 *
 * Given an array of integers where all are unique, unsorted, and consecutive, but one is missing,
 * return the missing integer.
 */
import * as assert from "assert";

function solution(arr: number[]): number {
  if (arr.length === 0) return 1;

  const arrSum = arr.reduce((prev, curr) => curr + prev);
  const n = arr.length + 1;
  const expectedSum = Math.floor((n * (n + 1)) / 2);

  return expectedSum - arrSum;
}

assert(solution([1]) === 2);
assert(solution([2]) === 1);
assert(solution([]) === 1);
assert(solution([1, 3, 5, 2, 6, 8, 7, 4]) === 9);
assert(solution([4, 2, 5, 3, 11, 6, 8, 9, 10, 14, 13, 7, 12]) === 1);
console.log("All assertions passed.");
