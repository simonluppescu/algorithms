"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assertArray_1 = require("./utils/assertArray");
function mergeSortedArrayDel(arr1, arr2) {
    var result = [];
    while (arr1.length > 0 || arr2.length > 0) {
        var firstVal = arr1[0];
        var secondVal = arr2[0];
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
    var result = [];
    var i = 0;
    var j = 0;
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
assertArray_1.default(mergeSortedArrayDel([1, 3, 5, 7, 9, 13, 19], [2, 4, 6, 8]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 19]);
assertArray_1.default(mergeSortedArrayDel([1, 5, 7, 10], [2, 6, 12, 14]), [1, 2, 5, 6, 7, 10, 12, 14]);
assertArray_1.default(mergeSortedArrayDel([], [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
assertArray_1.default(mergeSortedArrayDel([1], [1, 2, 3, 4, 5, 6]), [1, 1, 2, 3, 4, 5, 6]);
assertArray_1.default(mergeSortedArrayDel([1, 1, 1, 1, 1], [1, 1, 1, 1]), [1, 1, 1, 1, 1, 1, 1, 1, 1]);
assertArray_1.default(mergeSortedArrayDel([], []), []);
assertArray_1.default(mergeSortedArrayCopy([1, 3, 5, 7, 9, 13, 19], [2, 4, 6, 8]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 19]);
assertArray_1.default(mergeSortedArrayCopy([1, 5, 7, 10], [2, 6, 12, 14]), [1, 2, 5, 6, 7, 10, 12, 14]);
assertArray_1.default(mergeSortedArrayCopy([], [1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
assertArray_1.default(mergeSortedArrayCopy([1], [1, 2, 3, 4, 5, 6]), [1, 1, 2, 3, 4, 5, 6]);
assertArray_1.default(mergeSortedArrayCopy([1, 1, 1, 1, 1], [1, 1, 1, 1]), [1, 1, 1, 1, 1, 1, 1, 1, 1]);
assertArray_1.default(mergeSortedArrayCopy([], []), []);
console.log("All assertions passed.");
