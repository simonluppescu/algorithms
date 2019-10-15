"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Solve the Tower of Hanoi game
 * Not the best implementation because of the recursive calls keeping track of the same
 * instance of the towers. Instead of duplicating them, it undos the move after the
 * recursive call. This ends up with a bunch of solved states.
 */
var stack_1 = require("./utils/stack");
var Hanoi = /** @class */ (function () {
    function Hanoi(maxValue) {
        this.towers = [];
        this.towers.push(new Tower(maxValue));
        this.towers.push(new Tower());
        this.towers.push(new Tower());
        this.solvedKey = this.towers[0].toString();
        this.triedMoves = new Set();
    }
    Hanoi.prototype.solve = function () {
        var _this = this;
        var moves = this.getMoves();
        moves.forEach(function (move) {
            _this.applyMove(move);
            var thisState = _this.toKey();
            if (_this.isSolved()) {
                console.log("Solved!! " + thisState);
                return;
            }
            if (_this.triedMoves.has(thisState)) {
                console.log("State " + thisState + " has already been done.");
            }
            else {
                console.log("Current State: " + thisState);
                _this.triedMoves.add(thisState);
                _this.solve();
            }
            if (!_this.isSolved())
                _this.undoMove(move);
        });
    };
    Hanoi.prototype.isSolved = function () {
        return this.towers[0].isEmpty() && this.towers[1].isEmpty() && this.towers[2].toString() === this.solvedKey;
    };
    Hanoi.prototype.applyMove = function (move) {
        var originVal = this.towers[move.originIndex].pop();
        this.towers[move.destIndex].push(originVal);
    };
    Hanoi.prototype.undoMove = function (move) {
        var destVal = this.towers[move.destIndex].pop();
        this.towers[move.originIndex].push(destVal);
    };
    Hanoi.prototype.toKey = function () {
        return this.towers.map(function (tower) { return tower.toString(); }).join("-");
    };
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
var Tower = /** @class */ (function (_super) {
    __extends(Tower, _super);
    function Tower(maxValue) {
        if (maxValue === void 0) { maxValue = 0; }
        var _this = _super.call(this) || this;
        if (maxValue > 0) {
            for (var i = maxValue; i >= 1; i--) {
                _this.push(i);
            }
        }
        return _this;
    }
    Tower.prototype.toString = function () {
        return this.stack.join("");
    };
    Tower.prototype.canMoveTo = function (destTower) {
        if (this.isEmpty())
            return false;
        if (destTower.isEmpty())
            return true;
        return this.peek() < destTower.peek();
    };
    return Tower;
}(stack_1.default));
var Move = /** @class */ (function () {
    function Move(o, d) {
        this.originIndex = o;
        this.destIndex = d;
    }
    return Move;
}());
var game = new Hanoi(5);
game.solve();
