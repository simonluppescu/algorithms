"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: ARRAYS
 * Tags: math maps
 *
 * Given an array of integers, find a pair of indices whose values sum to a value, k.
 */
var assertArray_1 = require("./utils/assertArray");
function findPairs(arr, k) {
    var found = {};
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i];
        if (typeof found[value] !== "undefined") {
            return [found[value], i];
        }
        else {
            found[k - value] = i;
        }
    }
    return [];
}
assertArray_1.default(findPairs([4, 6, 10, 12, 18], 18), [1, 3]);
assertArray_1.default(findPairs([4, 6, 10, 12, 18], 16), [1, 2]);
assertArray_1.default(findPairs([4, 4], 8), [0, 1]);
assertArray_1.default(findPairs([1, 3, 7, 2, 3, 10], 6), [1, 4]);
assertArray_1.default(findPairs([1, 2, 3, 4, 5], 10), []);
assertArray_1.default(findPairs([1, 3, 6, 2], 6), []);
console.log("All assertions passed");
