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

  apply(move: Move): State {
    const newState = new State();
    newState.state = this.state.map((value) => value.duplicate());
    newState.state[this.getNextPlayerIndex()].applyMove(move);

    newState.players = this.players;
    newState.humanPlayer = this.humanPlayer;
    newState.aiPlayer = this.aiPlayer;
    newState.currentPlayerIndex = this.getNextPlayerIndex();

    return newState;
  }

  isTerminal(): boolean {
    return this.state[0].isLost() || this.state[1].isLost();
  }

  utility(): number {
    const humanUtility = this.state[this.humanPlayer.index].utility() * -1;
    const aiUtility = this.state[this.aiPlayer.index].utility();

    console.log(`human: ${humanUtility}, ai: ${aiUtility}`);
    return humanUtility + aiUtility;
  }
}

class Game {
  play(): void {
    // Testing state
    const state = new State(new Hands(4, 3), new Hands(1, 2));
    state.currentPlayerIndex = 1;
    console.log(this.getBestMove(state));
  }

  getBestMove(state: State): Move {
    const moves = state.getMoves();
    let bestMove: Move;
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

  minimax(state: State, depth: number): number {
    if (depth === 0 || state.isTerminal()) {
      console.log("NEW STATE");
      console.log(state);
      return state.utility();
    }

    const moves = state.getMoves();
    moves.forEach((value, index) => {});
  }
}

const g = new Game();

g.play();
