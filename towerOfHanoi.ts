import Stack from "./utils/stack";

class Hanoi {
  towers: Tower[];

  constructor(maxValue: number) {
    this.towers = [];
    this.towers.push(new Tower(maxValue));
    this.towers.push(new Tower());
    this.towers.push(new Tower());
  }

  solve(): void {}

  getMoves(): Move[] {
    const moves: Move[] = [];
    for (let i = 0; i < this.towers.length; i++) {
      for (let j = 0; j < this.towers.length; j++) {
        if (i === j) continue;

        if (this.towers[i].canMoveTo(this.towers[j])) {
          moves.push(new Move(i, j));
        }
      }
    }

    return moves;
  }
}

class Tower {
  discs: Stack<number>;

  constructor(maxValue = 0) {
    this.discs = new Stack<number>();

    if (maxValue > 0) {
      for (let i = maxValue; i >= 1; i--) {
        this.discs.push(i);
      }
    }
  }

  isEmpty(): boolean {
    return this.discs.isEmpty();
  }

  canMoveTo(destTower: Tower): boolean {
    if (this.isEmpty()) return false;
    if (destTower.isEmpty()) return true;

    return this.discs.peek() < destTower.discs.peek();
  }
}

class Move {
  originIndex: number;
  destIndex: number;

  constructor(o: number, d: number) {
    this.originIndex = o;
    this.destIndex = d;
  }
}

const game = new Hanoi(5);
console.log(game.getMoves());
