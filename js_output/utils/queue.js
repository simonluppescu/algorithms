"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.array = new Array();
    }
    Queue.prototype.enqueue = function (value) {
        this.array.push(value);
    };
    Queue.prototype.dequeue = function () {
        return this.array.splice(0, 1)[0];
    };
    Queue.prototype.clear = function () {
        while (!this.isEmpty()) {
            this.dequeue();
        }
    };
    Queue.prototype.peek = function () {
        return this.array[0];
    };
    Queue.prototype.isEmpty = function () {
        return this.array.length === 0;
    };
    return Queue;
}());
exports.default = Queue;
