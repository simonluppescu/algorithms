"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = require("./utils/stack");
var Hanoi = /** @class */ (function () {
    function Hanoi(maxValue) {
        this.towers = [];
        this.towers.push(new Tower(maxValue));
        this.towers.push(new Tower());
        this.towers.push(new Tower());
    }
    Hanoi.prototype.solve = function () { };
    Hanoi.prototype.getMoves = function () {
        var moves = [];
        for (var i = 0; i < this.towers.length; i++) {
            for (var j = 0; j < this.towers.length; j++) {
                if (i === j)
                    continue;
                if (this.towers[i].canMoveTo(this.towers[j])) {
                    moves.push(new Move(i, j));
                }
            }
        }
        return moves;
    };
    return Hanoi;
}());
var Tower = /** @class */ (function () {
    function Tower(maxValue) {
        if (maxValue === void 0) { maxValue = 0; }
        this.discs = new stack_1.default();
        if (maxValue > 0) {
            for (var i = maxValue; i >= 1; i--) {
                this.discs.push(i);
            }
        }
    }
    Tower.prototype.isEmpty = function () {
        return this.discs.isEmpty();
    };
    Tower.prototype.canMoveTo = function (destTower) {
        if (this.isEmpty())
            return false;
        if (destTower.isEmpty())
            return true;
        return this.discs.peek() < destTower.discs.peek();
    };
    return Tower;
}());
var Move = /** @class */ (function () {
    function Move(o, d) {
        this.originIndex = o;
        this.destIndex = d;
    }
    return Move;
}());
var game = new Hanoi(5);
console.log(game.getMoves());
