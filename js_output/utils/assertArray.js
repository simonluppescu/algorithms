"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
function assertArrayEquals(array1, array2) {
    assert(array1.length === array2.length);
    for (var i = 0; i < array1.length; i++) {
        assert(array1[i] === array2[i]);
    }
    console.log("Assertion: " + array1 + " PASSED.");
}
exports.default = assertArrayEquals;
