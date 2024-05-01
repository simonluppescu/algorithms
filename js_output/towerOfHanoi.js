/**
 * Category: RECURSION
 * Tags: recursion oop sets
 *
 * Solve the Tower of Hanoi game
 * Not the best implementation because of the recursive calls keeping track of the same
 * instance of the towers. Instead of duplicating them, it undos the move after the
 * recursive call. This ends up with a bunch of solved states.
 */
import Stack from "./utils/stack.js";
class Hanoi {
    towers;
    triedMoves;
    solvedKey;
    constructor(maxValue) {
        this.towers = [];
        this.towers.push(new Tower(maxValue));
        this.towers.push(new Tower());
        this.towers.push(new Tower());
        this.solvedKey = this.towers[0].toString();
        this.triedMoves = new Set();
    }
    solve() {
        const moves = this.getMoves();
        moves.forEach((move) => {
            this.applyMove(move);
            const thisState = this.toKey();
            if (this.isSolved()) {
                console.log(`Solved!! ${thisState}`);
                return;
            }
            if (this.triedMoves.has(thisState)) {
                console.log(`State ${thisState} has already been done.`);
            }
            else {
                console.log(`Current State: ${thisState}`);
                this.triedMoves.add(thisState);
                this.solve();
            }
            if (!this.isSolved())
                this.undoMove(move);
        });
    }
    isSolved() {
        return (this.towers[0].isEmpty() &&
            this.towers[1].isEmpty() &&
            this.towers[2].toString() === this.solvedKey);
    }
    applyMove(move) {
        const originVal = this.towers[move.originIndex].pop();
        this.towers[move.destIndex].push(originVal);
    }
    undoMove(move) {
        const destVal = this.towers[move.destIndex].pop();
        this.towers[move.originIndex].push(destVal);
    }
    toKey() {
        return this.towers.map((tower) => tower.toString()).join("-");
    }
    getMoves() {
        const moves = [];
        for (let i = 0; i < this.towers.length; i++) {
            for (let j = 0; j < this.towers.length; j++) {
                if (i === j)
                    continue;
                if (this.towers[i].canMoveTo(this.towers[j])) {
                    moves.push(new Move(i, j));
                }
            }
        }
        return moves;
    }
}
class Tower extends Stack {
    constructor(maxValue = 0) {
        super();
        if (maxValue > 0) {
            for (let i = maxValue; i >= 1; i--) {
                this.push(i);
            }
        }
    }
    toString() {
        return this.stack.join("");
    }
    canMoveTo(destTower) {
        if (this.isEmpty())
            return false;
        if (destTower.isEmpty())
            return true;
        return this.peek() < destTower.peek();
    }
}
class Move {
    originIndex;
    destIndex;
    constructor(o, d) {
        this.originIndex = o;
        this.destIndex = d;
    }
}
const game = new Hanoi(5);
game.solve();
