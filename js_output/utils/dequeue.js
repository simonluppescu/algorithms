"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dequeue = /** @class */ (function () {
    function Dequeue() {
        this.array = [];
    }
    Dequeue.prototype.pushFront = function (value) {
        this.array.splice(0, 0, value);
    };
    Dequeue.prototype.popFront = function () {
        return this.array.splice(0, 1);
    };
    Dequeue.prototype.peekFront = function () {
        return this.array[0];
    };
    Dequeue.prototype.pushBack = function (value) {
        this.array.push(value);
    };
    Dequeue.prototype.popBack = function () {
        return this.array.pop();
    };
    Dequeue.prototype.peekBack = function () {
        return this.array[this.array.length - 1];
    };
    Dequeue.prototype.clear = function () {
        while (!this.isEmpty()) {
            this.popFront();
        }
    };
    Dequeue.prototype.length = function () {
        return this.array.length;
    };
    Dequeue.prototype.isEmpty = function () {
        return this.length() === 0;
    };
    return Dequeue;
}());
exports.default = Dequeue;
