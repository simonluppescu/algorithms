"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
    }
    Stack.prototype.push = function (val) {
        this.stack.push(val);
    };
    Stack.prototype.pop = function () {
        return this.stack.pop();
    };
    Stack.prototype.peek = function () {
        return this.stack[this.stack.length - 1];
    };
    Stack.prototype.isEmpty = function () {
        return this.stack.length === 0;
    };
    return Stack;
}());
exports.default = Stack;
