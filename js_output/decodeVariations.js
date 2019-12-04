"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion strings chars
 *
 * Given a string of digits, such as '1262', count the number of combinations of decoding each number into a letter,
 * where 'a' -> 1 and 'z' -> 26.
 * For example: '1262' can become 1 2 6 2, 12 6 2, 1 26 2, so the answer is 3.
 */
var assert = require("assert");
var Decoder = /** @class */ (function () {
    function Decoder() {
        this.seenValues = new Map();
    }
    Decoder.prototype.decodeVariations = function (str) {
        var _this = this;
        if (this.seenValues[str])
            return this.seenValues[str];
        if (str[0] === "0")
            return 0;
        if (str === "")
            return 1;
        var count = 0;
        [1, 2].forEach(function (index) {
            if (str.length >= index && _this.isInRange(str.substring(0, index))) {
                count += _this.decodeVariations(str.substring(index));
            }
        });
        this.seenValues[str] = count;
        return count;
    };
    Decoder.prototype.isInRange = function (substr) {
        if (substr[0] === "0")
            return false;
        var num = parseInt(substr);
        return num > 0 && num <= 26;
    };
    return Decoder;
}());
var decoder = new Decoder();
assert(decoder.decodeVariations("1262") === 3);
var decoder2 = new Decoder();
assert(decoder2.decodeVariations("1204") === 1);
var decoder3 = new Decoder();
assert(decoder3.decodeVariations("10032") === 0);
console.log("All assertions passed.");
