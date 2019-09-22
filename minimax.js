class Player {
    constructor(name, index) {
        this.name = name;
        this.index = index;
    }
}
class Hands {
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
Hands.MAX_VALUE = 5;
class Move {
    constructor(player, from, to, number) {
        this.player = player;
        this.from = from;
        this.to = to;
        this.number = number;
    }
}
class State {
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
        moves.push(new Move(currPlayer, "left", "left", currHand.left));
        moves.push(new Move(currPlayer, "left", "right", currHand.left));
        moves.push(new Move(currPlayer, "right", "left", currHand.right));
        moves.push(new Move(currPlayer, "right", "right", currHand.right));
        return moves;
    }
    getNextPlayerIndex() {
        return (this.currentPlayerIndex + 1) % this.players.length;
    }
    apply(move) {
        const newState = new State();
        newState.state = this.state.map((value) => value.duplicate());
        newState.state[this.getNextPlayerIndex()].applyMove(move);
        newState.players = this.players;
        newState.humanPlayer = this.humanPlayer;
        newState.aiPlayer = this.aiPlayer;
        newState.currentPlayerIndex = this.getNextPlayerIndex();
        return newState;
    }
    isTerminal() {
        return this.state[0].isLost() || this.state[1].isLost();
    }
    utility() {
        const humanUtility = this.state[this.humanPlayer.index].utility() * -1;
        const aiUtility = this.state[this.aiPlayer.index].utility();
        console.log(`human: ${humanUtility}, ai: ${aiUtility}`);
        return humanUtility + aiUtility;
    }
}
class Game {
    play() {
        // Testing state
        const state = new State(new Hands(4, 3), new Hands(1, 2));
        state.currentPlayerIndex = 1;
        console.log(this.getBestMove(state));
    }
    getBestMove(state) {
        const moves = state.getMoves();
        let bestMove;
        let bestUtility = Number.MIN_SAFE_INTEGER;
        moves.forEach((currMove, index) => {
            console.log(state);
            console.log(currMove);
            let currUtility = this.minimax(state.apply(currMove), 0);
            if (currUtility > bestUtility) {
                bestUtility = currUtility;
                bestMove = currMove;
            }
        });
        return bestMove;
    }
    minimax(state, depth) {
        if (depth === 0 || state.isTerminal()) {
            console.log("NEW STATE");
            console.log(state);
            return state.utility();
        }
        const moves = state.getMoves();
        moves.forEach((value, index) => { });
    }
}
const g = new Game();
g.play();
