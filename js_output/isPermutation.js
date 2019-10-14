"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Determine if two strings are permutations (rearrangements of the letters) of each other
var assert = require("assert");
function isPermutation(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    var characters = {};
    for (var i = 0; i < str1.length; i++) {
        var char = str1[i];
        if (typeof characters[char] === "undefined") {
            characters[char] = 0;
        }
        characters[char] += 1;
    }
    for (var i = 0; i < str2.length; i++) {
        var char = str2[i];
        if (typeof characters[char] === "undefined") {
            return false;
        }
        else {
            characters[char] -= 1;
        }
    }
    for (var key in characters) {
        if (!characters.hasOwnProperty(key))
            continue;
        if (characters[key] > 0) {
            return false;
        }
    }
    return true;
}
assert(isPermutation("are", "rea") === true);
assert(isPermutation("hellol", "lloehl") === true);
assert(isPermutation("hello", "there") === false);
console.log("All assertions passed.");
