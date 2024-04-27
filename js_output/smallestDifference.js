/**
 * Category: ARRAYS
 * Tags: math arrays sorting
 *
 * Given two arrays of integers, compute the pair of values (one value in each
 * array) with the smallest (non-negative) difference. Return the pair.
 */
import assertArrayEquals from "./utils/assertArray.js";
function smallestDifference(arr1, arr2) {
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    let i = 0;
    let j = 0;
    let minDifference = Math.abs(arr1[i] - arr2[j]);
    let pair = [arr1[i], arr2[j]];
    while (i < arr1.length && j < arr2.length) {
        const one = arr1[i];
        const two = arr2[j];
        if (Math.abs(one - two) < minDifference) {
            minDifference = Math.abs(one - two);
            pair = [one, two];
        }
        if (one > two) {
            j++;
        }
        else {
            i++;
        }
    }
    return pair;
}
assertArrayEquals(smallestDifference([4, 9, 10, 19, 29], [1, 15, 21, 33, 39]), [19, 21]);
assertArrayEquals(smallestDifference([1, 3, 15, 11, 2], [23, 127, 235, 19, 8]), [11, 8]);
assertArrayEquals(smallestDifference([1, 100, 200, 400, 300], [4, 5, 6, 7, 8, 9, 10, 49, 38, 392]), [1, 4]);
assertArrayEquals(smallestDifference([1, 2, 3, 10, 20, 30, 49, 69, 98, 200], [100, 129, 200, 300]), [200, 200]);
console.log("All assertions passed.");
