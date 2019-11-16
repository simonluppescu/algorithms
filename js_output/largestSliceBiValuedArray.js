"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: ARRAYS
 * Tags: easy
 *
 * Given an array of integers, find the length of the largest slice of the array whose elements only consist of two values.
 * For example:
 * 1 3 4 3 4 4 2 3
 * The answer is 5 since the slice 3 4 3 4 4 only consists of two values and it's largest.
 */
var assert = require("assert");
function solution(arr) {
    if (arr.length <= 2)
        return arr.length;
    var maxLength = 2;
    var currLength = 2;
    var firstNum = arr[0];
    var secondNum = arr[1];
    for (var i = 2; i < arr.length; i++) {
        if (arr[i] === firstNum || arr[i] === secondNum) {
            currLength += 1;
        }
        else {
            if (currLength > maxLength)
                maxLength = currLength;
            currLength = 2;
            firstNum = arr[i - 1];
            secondNum = arr[i];
        }
    }
    if (currLength > maxLength)
        maxLength = currLength;
    return maxLength;
}
assert(solution([4, 2, 2, 4, 2]) === 5);
assert(solution([1, 3, 2, 3, 3, 2, 9, 2]) === 5);
console.log("All assertions passed.");
