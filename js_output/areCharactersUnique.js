"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Determine if every character in a string is unique
var assert = require("assert");
function isUnique(str) {
    var characters = {};
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        if (characters[char]) {
            return false;
        }
        else {
            characters[char] = true;
        }
    }
    return true;
}
assert(isUnique("hello") === false);
assert(isUnique("poqieal") === true);
console.log("All assertions passed.");
