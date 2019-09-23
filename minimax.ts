import * as readline from "readline";

class Player {
  name: string;
  index: number;

  constructor(name: string, index: number) {
    this.name = name;
    this.index = index;
  }
}

class Hands {
  static readonly MAX_VALUE = 5;

  left: number;
  right: number;

  constructor(left = 1, right = 1) {
    this.left = left;
    this.right = right;
  }

  applyMove(move: Move): void {
    const newValue = (this[move.to] + move.number) % (Hands.MAX_VALUE + 1);
    this[move.to] = newValue;
  }

  duplicate(): Hands {
    return new Hands(this.left, this.right);
  }

  isLost(): boolean {
    return this.left === 0 && this.right === 0;
  }

  utility(): number {
    if (this.left === 0 && this.right === 0) {
      return -10;
    } else if (this.left === 0) {
      return -5;
    } else if (this.right === 0) {
      return -5;
    } else {
      return 0;
    }
  }
}

class Move {
  player: Player;
  from: string;
  to: string;
  number: number;

  constructor(player: Player, from: string, to: string, number: number) {
    this.player = player;
    this.from = from;
    this.to = to;
    this.number = number;
  }
}

class State {
  state: Hands[];
  players: Player[];
  humanPlayer: Player;
  aiPlayer: Player;
  currentPlayerIndex: number;

  constructor(hand1 = new Hands(), hand2 = new Hands()) {
    this.state = [hand1, hand2];

    this.humanPlayer = new Player("simon", 0);
    this.aiPlayer = new Player("ai", 1);
    this.players = [];
    this.players[this.humanPlayer.index] = this.humanPlayer;
    this.players[this.aiPlayer.index] = this.aiPlayer;

    this.currentPlayerIndex = 0;
  }

  getMoves(): Move[] {
    const moves: Move[] = [];
    const currPlayer = this.players[this.currentPlayerIndex];
    const currHand = this.state[this.currentPlayerIndex];

    moves.push(new Move(currPlayer, "left", "left", currHand.left));
    moves.push(new Move(currPlayer, "left", "right", currHand.left));
    moves.push(new Move(currPlayer, "right", "left", currHand.right));
    moves.push(new Move(currPlayer, "right", "right", currHand.right));

    return moves;
  }

  getNextPlayerIndex(): number {
    return (this.currentPlayerIndex + 1) % this.players.length;
  }

  isAiPlayer(): boolean {
    return this.currentPlayerIndex === this.aiPlayer.index;
  }

  testMove(move: Move): State {
    const newState = new State();
    newState.state = this.state.map((value) => value.duplicate());
    newState.state[this.getNextPlayerIndex()].applyMove(move);

    newState.players = this.players;
    newState.humanPlayer = this.humanPlayer;
    newState.aiPlayer = this.aiPlayer;
    newState.currentPlayerIndex = this.getNextPlayerIndex();

    return newState;
  }

  applyMove(move: Move): void {
    const nextPlayerIndex = this.getNextPlayerIndex();

    this.state[nextPlayerIndex].applyMove(move);
    this.currentPlayerIndex = nextPlayerIndex;
  }

  isTerminal(): boolean {
    return this.state[0].isLost() || this.state[1].isLost();
  }

  utility(): number {
    const humanUtility = this.state[this.humanPlayer.index].utility() * -1;
    const aiUtility = this.state[this.aiPlayer.index].utility() * 1.2;

    return humanUtility + aiUtility;
  }
}

class Game {
  play(): void {
    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });
    // rl.question("Hi. ", (answer) => {
    //   console.log(answer);
    //   rl.close();
    // });
  }

  getBestMove(state: State): Move {
    const moves = state.getMoves();
    let bestMove: Move;
    let bestUtility = Number.MIN_SAFE_INTEGER;
    moves.forEach((currMove, _index) => {
      const currUtility = this.minimax(state.testMove(currMove), 2);
      if (currUtility > bestUtility) {
        bestUtility = currUtility;
        bestMove = currMove;
      }
    });

    console.log(`Chose this move with the utility ${bestUtility}`);
    console.log(bestMove);
    return bestMove;
  }

  minimax(state: State, depth: number): number {
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
    } else {
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
