"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: MATH
 * Tags: easy arithmetic
 *
 * Given a string input with commands separated by spaces, compute values on a stack
 * based on commands. DUP will duplicate the top value on stack and push it. POP pops value.
 * + and - will pop top two values and perform that operation and then push result.
 * Getting a number will simply push that number. If value is not positive or is greater than the
 * max value of 2^20 - 1, then return -1. If there aren't enough numbers on stack to perform some
 * operation, then return -1.
 *
 * Example: 3 DUP 5 + - returns 5.
 * Example: 3 DUP 2 - - return -1 since the result of 2 - 3 is negative.
 */
var stack_1 = require("./utils/stack");
var assert = require("assert");
var Solver = /** @class */ (function () {
    function Solver() {
        this.MAX_VALUE = Math.pow(2, 20);
        this.stack = new stack_1.default();
        this.okayToContinue = true;
    }
    Solver.prototype.compute = function (strInput) {
        var commands = strInput.split(" ");
        try {
            for (var commands_1 = __values(commands), commands_1_1 = commands_1.next(); !commands_1_1.done; commands_1_1 = commands_1.next()) {
                var command = commands_1_1.value;
                if (!this.okayToContinue)
                    break;
                switch (command) {
                    case "DUP": {
                        this.duplicate();
                        break;
                    }
                    case "POP": {
                        this.pop();
                        break;
                    }
                    case "+": {
                        this.add();
                        break;
                    }
                    case "-": {
                        this.subtract();
                        break;
                    }
                    default:
                        this.addNumber(command);
                        break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (commands_1_1 && !commands_1_1.done && (_a = commands_1.return)) _a.call(commands_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.okayToContinue && !this.stack.isEmpty() ? this.stack.peek() : -1;
        var e_1, _a;
    };
    Solver.prototype.duplicate = function () {
        var topElement = this.stack.peek();
        if (!this.isValid(topElement)) {
            this.okayToContinue = false;
            return;
        }
        this.stack.push(topElement);
    };
    Solver.prototype.pop = function () {
        var topElement = this.stack.pop();
        if (!this.isValid(topElement)) {
            this.okayToContinue = false;
            return;
        }
    };
    Solver.prototype.add = function () {
        this.performArithmetic(function (elem1, elem2) { return elem1 + elem2; });
    };
    Solver.prototype.subtract = function () {
        this.performArithmetic(function (elem1, elem2) { return elem1 - elem2; });
    };
    Solver.prototype.performArithmetic = function (operationFunc) {
        var topElement = this.stack.pop();
        var secondElement = this.stack.pop();
        if (!this.isValid(topElement) || !this.isValid(secondElement)) {
            this.okayToContinue = false;
            return;
        }
        var result = operationFunc(topElement, secondElement);
        if (!this.isValid(result)) {
            this.okayToContinue = false;
            return;
        }
        this.stack.push(result);
    };
    Solver.prototype.addNumber = function (command) {
        var element = parseInt(command);
        if (!this.isValid(element)) {
            this.okayToContinue = false;
            return;
        }
        this.stack.push(element);
    };
    Solver.prototype.isValid = function (value) {
        return typeof value !== "undefined" && value >= 0 && value < this.MAX_VALUE;
    };
    return Solver;
}());
function solution(str) {
    var solver = new Solver();
    var result = solver.compute(str);
    // console.log(result);
    return result;
}
// DONT COPY BELOW HERE
assert(solution("13 DUP 4 POP 5 DUP + DUP + -") === 7);
assert(solution("5 6 + +") === -1);
assert(solution("3 DUP 5 - -") === -1);
assert(solution("1048575 0 +") === 1048575);
assert(solution("10 20 -") === 10);
assert(solution("3 9 DUP -") === 0);
assert(solution("13 POP") === -1);
assert(solution("13 13 13 13") === 13);
assert(solution("1048575 1 +") === -1);
assert(solution("1048533 399 +") === -1);
assert(solution("1048576") === -1);
assert(solution("921392939") === -1);
assert(solution("-29") === -1);
assert(solution("10 4 -") === -1);
assert(solution("13 13 139 -129 929 921") === -1);
assert(solution("POP 299") === -1);
assert(solution("DUP 13 13") === -1);
assert(solution("DUP DUP DUP POP POP DUP") === -1);
console.log("All assertions passed");
