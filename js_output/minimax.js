/**
 * Category: RECURSION
 * Tags: recursion trees difficult oop
 */
import * as readline from "readline";
class Player {
    name;
    index;
    constructor(name, index) {
        this.name = name;
        this.index = index;
    }
}
class Hands {
    static MAX_VALUE = 5;
    left;
    right;
    constructor(left = 1, right = 1) {
        this.left = left;
        this.right = right;
    }
    applyMove(move) {
        const newValue = (this[move.to] + move.number) % (Hands.MAX_VALUE + 1);
        this[move.to] = newValue;
    }
    duplicate() {
        return new Hands(this.left, this.right);
    }
    isLost() {
        return this.left === 0 && this.right === 0;
    }
    utility() {
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
    }
}
class Move {
    player;
    from;
    to;
    number;
    constructor(player, from, to, number) {
        this.player = player;
        this.from = from;
        this.to = to;
        this.number = number;
    }
}
class State {
    state;
    players;
    humanPlayer;
    aiPlayer;
    currentPlayerIndex;
    constructor(hand1 = new Hands(), hand2 = new Hands()) {
        this.state = [hand1, hand2];
        this.humanPlayer = new Player("simon", 0);
        this.aiPlayer = new Player("ai", 1);
        this.players = [];
        this.players[this.humanPlayer.index] = this.humanPlayer;
        this.players[this.aiPlayer.index] = this.aiPlayer;
        this.currentPlayerIndex = 0;
    }
    getMoves() {
        const moves = [];
        const currPlayer = this.players[this.currentPlayerIndex];
        const currHand = this.state[this.currentPlayerIndex];
        const otherHand = this.state[this.getNextPlayerIndex()];
        if (currHand.left !== 0) {
            if (otherHand.left !== 0) {
                moves.push(new Move(currPlayer, "left", "left", currHand.left));
            }
            if (otherHand.right !== 0) {
                moves.push(new Move(currPlayer, "left", "right", currHand.left));
            }
        }
        if (currHand.right !== 0) {
            if (otherHand.left !== 0) {
                moves.push(new Move(currPlayer, "right", "left", currHand.right));
            }
            if (otherHand.right !== 0) {
                moves.push(new Move(currPlayer, "right", "right", currHand.right));
            }
        }
        return moves;
    }
    getNextPlayerIndex() {
        return (this.currentPlayerIndex + 1) % this.players.length;
    }
    isAiPlayer() {
        return this.currentPlayerIndex === this.aiPlayer.index;
    }
    testMove(move) {
        const newState = new State();
        newState.state = this.state.map((value) => value.duplicate());
        newState.state[this.getNextPlayerIndex()].applyMove(move);
        newState.players = this.players;
        newState.humanPlayer = this.humanPlayer;
        newState.aiPlayer = this.aiPlayer;
        newState.currentPlayerIndex = this.getNextPlayerIndex();
        return newState;
    }
    applyMove(move) {
        const nextPlayerIndex = this.getNextPlayerIndex();
        this.state[nextPlayerIndex].applyMove(move);
        this.currentPlayerIndex = nextPlayerIndex;
    }
    isTerminal() {
        return this.state[0].isLost() || this.state[1].isLost();
    }
    utility() {
        const humanUtility = this.state[this.humanPlayer.index].utility() * -1;
        const aiUtility = this.state[this.aiPlayer.index].utility() * 1.2;
        return humanUtility + aiUtility;
    }
    print() {
        const humanHands = this.state[this.humanPlayer.index];
        const aiHands = this.state[this.aiPlayer.index];
        console.log(`Player: ${this.humanPlayer.name}\nL R\n${humanHands.left} ${humanHands.right}`);
        console.log(`AI: ${this.aiPlayer.name}\nL R\n${aiHands.left} ${aiHands.right}`);
    }
}
class Game {
    state;
    constructor() {
        this.state = new State();
    }
    play() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.setPrompt("Enter your move> ");
        this.state.print();
        rl.prompt();
        rl.on("line", (line) => {
            const { left, right } = this.state.state[this.state.currentPlayerIndex];
            let move;
            switch (line.trim()) {
                case "LL":
                    move = new Move(this.state.humanPlayer, "left", "left", left);
                    break;
                case "LR":
                    move = new Move(this.state.humanPlayer, "left", "right", left);
                    break;
                case "RL":
                    move = new Move(this.state.humanPlayer, "right", "left", right);
                    break;
                case "RR":
                    move = new Move(this.state.humanPlayer, "right", "right", right);
                    break;
                default:
                    console.error("Invalid command");
                    return;
            }
            this.state.applyMove(move);
            this.state.print();
            if (this.state.isTerminal()) {
                console.log("Game over!");
                rl.close();
                return;
            }
            const aiMove = this.getBestMove(this.state);
            console.log(`AI moves: ${aiMove.from} to ${aiMove.to} with value ${aiMove.number}`);
            this.state.applyMove(aiMove);
            this.state.print();
            if (this.state.isTerminal()) {
                console.log("Game over!");
                rl.close();
            }
            else {
                rl.prompt();
            }
        });
    }
    getBestMove(state) {
        const moves = state.getMoves();
        let bestMove;
        let bestUtility = Number.MIN_SAFE_INTEGER;
        moves.forEach((currMove, _index) => {
            const currUtility = this.minimax(state.testMove(currMove), 2);
            if (currUtility > bestUtility) {
                bestUtility = currUtility;
                bestMove = currMove;
            }
        });
        // console.log(`Chose this move with the utility ${bestUtility}`);
        // console.log(bestMove);
        return bestMove;
    }
    minimax(state, depth) {
        if (depth === 0 || state.isTerminal()) {
            return state.utility();
        }
        const moves = state.getMoves();
        if (state.isAiPlayer()) {
            let max = Number.MIN_SAFE_INTEGER;
            moves.forEach((currMove, _index) => {
                max = Math.max(max, this.minimax(state.testMove(currMove), depth - 1));
            });
            return max;
        }
        else {
            let min = Number.MAX_SAFE_INTEGER;
            moves.forEach((currMove, _index) => {
                min = Math.min(min, this.minimax(state.testMove(currMove), depth - 1));
            });
            return min;
        }
    }
}
const g = new Game();
g.play();
