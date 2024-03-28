/**
 * Category: ARRAYS
 * Tags: sorting two_indices
 *
 * Merge two sorted arrays into one sorted array.
 */
import assertArray from "./utils/assertArray.js";
function mergeSortedArrayDel(arr1, arr2) {
    let result = [];
    while (arr1.length > 0 || arr2.length > 0) {
        const firstVal = arr1[0];
        const secondVal = arr2[0];
        if (arr1.length === 0) {
            result = result.concat(arr2.splice(0));
            break;
        }
        else if (arr2.length === 0) {
            result = result.concat(arr1.splice(0));
            break;
        }
        if (firstVal <= secondVal) {
            result.push(arr1.splice(0, 1)[0]);
        }
        else {
            result.push(arr2.splice(0, 1)[0]);
        }
    }
    return result;
}
function mergeSortedArrayCopy(arr1, arr2) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length || j < arr2.length) {
        if (typeof arr2[j] === "undefined" || arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        }
        else if (typeof arr1[i] === "undefined" || arr1[i] > arr2[j]) {
            result.push(arr2[j]);
            j++;
        }
    }
    return result;
}
// prettier-ignore
// eslint-disable-next-line max-len
assertArray(mergeSortedArrayDel([1, 3, 5, 7, 9, 13, 19], [2, 4, 6, 8]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 19]);
assertArray(mergeSortedArrayDel([1, 5, 7, 10], [2, 6, 12, 14]), [1, 2, 5, 6, 7, 10, 12, 14]);
assertArray(mergeSortedArrayDel([], [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
assertArray(mergeSortedArrayDel([1], [1, 2, 3, 4, 5, 6]), [1, 1, 2, 3, 4, 5, 6]);
assertArray(mergeSortedArrayDel([1, 1, 1, 1, 1], [1, 1, 1, 1]), [1, 1, 1, 1, 1, 1, 1, 1, 1]);
assertArray(mergeSortedArrayDel([], []), []);
// prettier-ignore
// eslint-disable-next-line max-len
assertArray(mergeSortedArrayCopy([1, 3, 5, 7, 9, 13, 19], [2, 4, 6, 8]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 19]);
assertArray(mergeSortedArrayCopy([1, 5, 7, 10], [2, 6, 12, 14]), [1, 2, 5, 6, 7, 10, 12, 14]);
assertArray(mergeSortedArrayCopy([], [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
assertArray(mergeSortedArrayCopy([1], [1, 2, 3, 4, 5, 6]), [1, 1, 2, 3, 4, 5, 6]);
assertArray(mergeSortedArrayCopy([1, 1, 1, 1, 1], [1, 1, 1, 1]), [1, 1, 1, 1, 1, 1, 1, 1, 1]);
assertArray(mergeSortedArrayCopy([], []), []);
console.log("All assertions passed.");
