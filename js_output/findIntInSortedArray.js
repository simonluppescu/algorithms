"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Searcher = /** @class */ (function () {
    function Searcher(array) {
        this.array = array;
    }
    Searcher.prototype.getIndex = function (target) {
        this.reset();
        // this.print(target);
        while (this.currValue !== target) {
            if (this.currValue < target) {
                this.lowerBound = this.currIndex + 1;
            }
            else if (this.currValue > target) {
                this.upperBound = this.currIndex;
            }
            if (this.lowerBound === this.upperBound)
                break;
            this.nextStep();
            // this.print(target);
        }
        return this.currValue === target ? this.currIndex : -1;
    };
    Searcher.prototype.nextStep = function () {
        this.currIndex = Math.floor((this.upperBound - 1 + this.lowerBound) / 2);
        this.currValue = this.array[this.currIndex];
        this.counter++;
    };
    Searcher.prototype.reset = function () {
        this.counter = 0;
        this.upperBound = this.array.length;
        this.lowerBound = 0;
        this.nextStep();
    };
    Searcher.prototype.print = function (target) {
        console.log("Lower: " + this.lowerBound + ", Upper: " + this.upperBound + ", currI: " + this.currIndex + ", curr: " + this.currValue + ", target: " + target);
    };
    return Searcher;
}());
var firstTest = [1, 2, 3, 4, 6, 8, 9, 12, 15, 19, 34, 54, 59, 100];
var s = new Searcher(firstTest);
firstTest.forEach(function (value, index) {
    assert(s.getIndex(value) === index);
    console.log(value + " is indeed at " + index + ". Found in " + s.counter + " steps.");
});
console.log("Done.");
