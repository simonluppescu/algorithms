"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion
 *
 * Given a set of coins with numerical values, compute the minimum number of coins that are used to sum to a given amount.
 * For example, for coins 5, 2, 1, and an amount 8, the answer is 3 coins.
 */
var assert = require("assert");
var Changer = /** @class */ (function () {
    function Changer(coins) {
        this.coins = coins;
    }
    Changer.prototype.compute = function (remaining) {
        var _this = this;
        if (this.coins.includes(remaining))
            return 1;
        if (remaining === 0)
            return 0;
        if (remaining < 0)
            return -1;
        var results = [];
        this.coins.forEach(function (coin) {
            var result = _this.compute(remaining - coin);
            if (result !== -1) {
                results.push(result + 1);
            }
        });
        return results.length > 0 ? Math.min.apply(Math, results) : -1;
    };
    return Changer;
}());
var ChangerMemoized = /** @class */ (function () {
    function ChangerMemoized(coins) {
        this.coins = coins;
        this.storedValues = {};
    }
    ChangerMemoized.prototype.compute = function (remaining) {
        var _this = this;
        if (this.coins.includes(remaining))
            return 1;
        if (remaining === 0)
            return 0;
        if (remaining < 0)
            return -1;
        if (this.storedValues[remaining])
            return this.storedValues[remaining];
        var results = [];
        this.coins.forEach(function (coin) {
            var result = _this.compute(remaining - coin);
            if (result !== -1) {
                results.push(result + 1);
            }
        });
        var finalResult = results.length > 0 ? Math.min.apply(Math, results) : -1;
        this.storedValues[remaining] = finalResult;
        return finalResult;
    };
    return ChangerMemoized;
}());
assert(new Changer([8, 6, 1]).compute(12) === 2);
assert(new Changer([5, 2, 1]).compute(11) === 3);
assert(new Changer([1, 2, 3]).compute(0) === 0);
assert(new Changer([5, 3]).compute(4) === -1);
assert(new ChangerMemoized([1, 2, 5]).compute(100) === 20);
assert(new ChangerMemoized([4, 3, 1]).compute(123) === 31);
console.log("All assertions passed.");
