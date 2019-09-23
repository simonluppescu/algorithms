"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Player = /** @class */ (function () {
    function Player(name, index) {
        this.name = name;
        this.index = index;
    }
    return Player;
}());
var Hands = /** @class */ (function () {
    function Hands(left, right) {
        if (left === void 0) { left = 1; }
        if (right === void 0) { right = 1; }
        this.left = left;
        this.right = right;
    }
    Hands.prototype.applyMove = function (move) {
        var newValue = (this[move.to] + move.number) % (Hands.MAX_VALUE + 1);
        this[move.to] = newValue;
    };
    Hands.prototype.duplicate = function () {
        return new Hands(this.left, this.right);
    };
    Hands.prototype.isLost = function () {
        return this.left === 0 && this.right === 0;
    };
    Hands.prototype.utility = function () {
        if (this.left === 0 && this.right === 0) {
            return -10;
        }
        else if (this.left === 0) {
            return -5;
        }
        else if (this.right === 0) {
            return -5;
        }
        else {
            return 0;
        }
    };
    Hands.MAX_VALUE = 5;
    return Hands;
}());
var Move = /** @class */ (function () {
    function Move(player, from, to, number) {
        this.player = player;
        this.from = from;
        this.to = to;
        this.number = number;
    }
    return Move;
}());
var State = /** @class */ (function () {
    function State(hand1, hand2) {
        if (hand1 === void 0) { hand1 = new Hands(); }
        if (hand2 === void 0) { hand2 = new Hands(); }
        this.state = [hand1, hand2];
        this.humanPlayer = new Player("simon", 0);
        this.aiPlayer = new Player("ai", 1);
        this.players = [];
        this.players[this.humanPlayer.index] = this.humanPlayer;
        this.players[this.aiPlayer.index] = this.aiPlayer;
        this.currentPlayerIndex = 0;
    }
    State.prototype.getMoves = function () {
        var moves = [];
        var currPlayer = this.players[this.currentPlayerIndex];
        var currHand = this.state[this.currentPlayerIndex];
        moves.push(new Move(currPlayer, "left", "left", currHand.left));
        moves.push(new Move(currPlayer, "left", "right", currHand.left));
        moves.push(new Move(currPlayer, "right", "left", currHand.right));
        moves.push(new Move(currPlayer, "right", "right", currHand.right));
        return moves;
    };
    State.prototype.getNextPlayerIndex = function () {
        return (this.currentPlayerIndex + 1) % this.players.length;
    };
    State.prototype.isAiPlayer = function () {
        return this.currentPlayerIndex === this.aiPlayer.index;
    };
    State.prototype.testMove = function (move) {
        var newState = new State();
        newState.state = this.state.map(function (value) { return value.duplicate(); });
        newState.state[this.getNextPlayerIndex()].applyMove(move);
        newState.players = this.players;
        newState.humanPlayer = this.humanPlayer;
        newState.aiPlayer = this.aiPlayer;
        newState.currentPlayerIndex = this.getNextPlayerIndex();
        return newState;
    };
    State.prototype.applyMove = function (move) {
        var nextPlayerIndex = this.getNextPlayerIndex();
        this.state[nextPlayerIndex].applyMove(move);
        this.currentPlayerIndex = nextPlayerIndex;
    };
    State.prototype.isTerminal = function () {
        return this.state[0].isLost() || this.state[1].isLost();
    };
    State.prototype.utility = function () {
        var humanUtility = this.state[this.humanPlayer.index].utility() * -1;
        var aiUtility = this.state[this.aiPlayer.index].utility() * 1.2;
        return humanUtility + aiUtility;
    };
    State.prototype.print = function () {
        var humanHands = this.state[this.humanPlayer.index];
        var aiHands = this.state[this.aiPlayer.index];
        console.log("Player: " + this.humanPlayer.name + "\nL R\n" + humanHands.left + " " + humanHands.right);
        console.log("AI: " + this.aiPlayer.name + "\nL R\n" + aiHands.left + " " + aiHands.right);
    };
    return State;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.state = new State();
    }
    Game.prototype.play = function () {
        var _this = this;
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt("Enter your move> ");
        this.state.print();
        rl.prompt();
        rl.on("line", function (line) {
            var _a = _this.state.state[_this.state.currentPlayerIndex], left = _a.left, right = _a.right;
            var move;
            switch (line.trim()) {
                case "LL":
                    move = new Move(_this.state.humanPlayer, "left", "left", left);
                    break;
                case "LR":
                    move = new Move(_this.state.humanPlayer, "left", "right", left);
                    break;
                case "RL":
                    move = new Move(_this.state.humanPlayer, "right", "left", right);
                    break;
                case "RR":
                    move = new Move(_this.state.humanPlayer, "right", "right", right);
                    break;
                default:
                    console.error("Invalid command");
                    return;
            }
            _this.state.applyMove(move);
            _this.state.print();
            var aiMove = _this.getBestMove(_this.state);
            console.log("AI moves: " + aiMove.from + " to " + aiMove.to + " with value " + aiMove.number);
            _this.state.applyMove(aiMove);
            _this.state.print();
            if (_this.state.isTerminal()) {
                console.log("Game over!");
                rl.close();
            }
            else {
                rl.prompt();
            }
        });
    };
    Game.prototype.getBestMove = function (state) {
        var _this = this;
        var moves = state.getMoves();
        var bestMove;
        var bestUtility = Number.MIN_SAFE_INTEGER;
        moves.forEach(function (currMove, _index) {
            var currUtility = _this.minimax(state.testMove(currMove), 2);
            if (currUtility > bestUtility) {
                bestUtility = currUtility;
                bestMove = currMove;
            }
        });
        // console.log(`Chose this move with the utility ${bestUtility}`);
        // console.log(bestMove);
        return bestMove;
    };
    Game.prototype.minimax = function (state, depth) {
        var _this = this;
        if (depth === 0 || state.isTerminal()) {
            return state.utility();
        }
        var moves = state.getMoves();
        if (state.isAiPlayer()) {
            var max_1 = Number.MIN_SAFE_INTEGER;
            moves.forEach(function (currMove, _index) {
                max_1 = Math.max(max_1, _this.minimax(state.testMove(currMove), depth - 1));
            });
            return max_1;
        }
        else {
            var min_1 = Number.MAX_SAFE_INTEGER;
            moves.forEach(function (currMove, _index) {
                min_1 = Math.min(min_1, _this.minimax(state.testMove(currMove), depth - 1));
            });
            return min_1;
        }
    };
    return Game;
}());
var g = new Game();
g.play();
