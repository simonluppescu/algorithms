"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: ARRAYS
 * Tags: sorting maps
 *
 * Given an array of integers, find all two-element pairs with smallest absolute difference between each other,
 * and out of those, return the distance between the indices of the pair which are farthest away from each other.
 * For example:
 * 2 3 4 7 2 4 3 5
 * The answer is 6 because the 2 at index 0 and 3 at index 6 are the farthest, and the values difference is 1.
 */
var assert = require("assert");
function solution(arr) {
    if (arr.length === 1)
        return 0;
    var indices = {};
    for (var i = 0; i < arr.length; i++) {
        if (indices[arr[i]] === undefined)
            indices[arr[i]] = [];
        indices[arr[i]].push(i);
    }
    var maxDistance = 0;
    var values = Object.keys(indices).sort();
    for (var i = 1; i < values.length; i++) {
        var first = indices[values[i - 1]];
        var second = indices[values[i]];
        var currDistance = Math.max(getDiff(first[0], second[second.length - 1]), getDiff(first[first.length - 1], second[0]));
        if (currDistance > maxDistance)
            maxDistance = currDistance;
    }
    return maxDistance;
}
function getDiff(first, second) {
    return Math.abs(first - second);
}
// console.log(easySolution([1, 2, 4, 4, 4, 3, 9]));
assert(solution([2, 6, 5, 3, 4, 4]) === 3);
assert(solution([2, 3, 4, 7, 2, 4, 3, 5, 2]) === 7);
console.log("All assertions passed.");
