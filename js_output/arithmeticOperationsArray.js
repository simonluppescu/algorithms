"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: ARRAYS
 * Tags: math algorithms
 *
 * We are given a length K, and a series of "operations". Each operation is performed
 * on a range of an array of length K, such as addition or subtraction of each element
 * in the range. Then, compute the maximum value in the array after all the operations
 * are completed.
 * For example, for K = 10 and operations:
 * a b v
 * 3 9 3
 * 1 4 7
 * 5 9 4
 * 4 5 2
 * The resulting array is 0 7 7 10 12 9 7 7 7 7, so the answer is 12.
 */
var assert = require("assert");
var ArithmeticSolver = /** @class */ (function () {
    function ArithmeticSolver(k) {
        this.arrayLen = k;
        this.intervals = new Map();
    }
    ArithmeticSolver.prototype.solve = function (operations) {
        var _this = this;
        operations.forEach(function (op) {
            var start = op[0];
            var end = op[1];
            var value = op[2];
            _this.intervals.set(start, (_this.intervals.get(start) || 0) + value);
            _this.intervals.set(end + 1, (_this.intervals.get(end + 1) || 0) - value);
        });
        var max = 0;
        var currValue = 0;
        for (var i = 1; i <= this.arrayLen; i++) {
            if (!this.intervals.has(i))
                continue;
            currValue += this.intervals.get(i);
            max = Math.max(max, currValue);
        }
        return max;
    };
    return ArithmeticSolver;
}());
var ars = new ArithmeticSolver(10);
assert(ars.solve([[3, 9, 3], [1, 4, 7], [5, 9, 4], [4, 5, 2]]) === 12);
var ars2 = new ArithmeticSolver(4);
assert(ars2.solve([[2, 3, 603], [1, 1, 286], [4, 4, 882]]) === 882);
console.log("All assertions passed.");
