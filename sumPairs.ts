/**
 * Category: ARRAYS
 * Tags: math maps
 *
 * Given an array of integers, find a pair of indices whose values sum to a value, k.
 */
import assertArrayEquals from "./utils/assertArray";

function findPairs(arr: Array<number>, k: number): Array<number> {
  const found: { [key: number]: number } = {};

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (found[value]) {
      return [found[value], i];
    } else {
      found[k - value] = i;
    }
  }

  return [];
}

assertArrayEquals(findPairs([4, 6, 10, 12, 18], 18), [1, 3]);
assertArrayEquals(findPairs([4, 6, 10, 12, 18], 16), [1, 2]);
assertArrayEquals(findPairs([1, 3, 7, 2, 3, 10], 6), [1, 4]);
assertArrayEquals(findPairs([1, 2, 3, 4, 5], 10), []);
assertArrayEquals(findPairs([1, 3, 4, 2], 4), []);
console.log("All assertions passed");
