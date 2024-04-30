/**
 * Category: ARRAYS
 * Tags: sorting
 *
 * Given an array of integers, write a method to find indices mand n such that if you sorted
 * elements m through n, the entire array would be sorted. Minimize n - m (that is,
 * find the smallest such sequence).
 */
import assertArrayEquals from "./utils/assertArray.js";
function findSubSortArray(arr) {
    let m = 0;
    let left = arr.slice(0, m);
    let middle = arr.slice(m);
    while (m < arr.length) {
        if (Math.max(...left) < Math.min(...middle)) {
            m++;
            left = arr.slice(0, m);
            middle = arr.slice(m);
        }
        else {
            m--;
            break;
        }
    }
    if (m === arr.length) {
        return [0, 0];
    }
    let n = arr.length - 1;
    middle = arr.slice(0, n);
    let right = arr.slice(n);
    while (n >= m) {
        if (Math.max(...middle) < Math.min(...right)) {
            n--;
            middle = arr.slice(0, n);
            right = arr.slice(n);
        }
        else {
            break;
        }
    }
    return [m, n];
}
assertArrayEquals(findSubSortArray([1, 2, 4, 7, 10, 11, 6, 12, 6, 7, 16, 18, 19]), [3, 9]);
assertArrayEquals(findSubSortArray([1, 4, 2, 4, 5, 6, 7, 8]), [1, 3]);
assertArrayEquals(findSubSortArray([1, 2, 3, 4, 5]), [0, 0]);
assertArrayEquals(findSubSortArray([7, 6, 5, 4, 3]), [0, 4]);
console.log("All assertions passed.");
