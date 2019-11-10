class MaxSubsetSolver {
  array: number[];
  memos: Map<number, number>;

  constructor(arr: number[]) {
    this.array = arr;
  }

  solveRecursively(): number {
    this.memos = new Map<number, number>();

    return this.solveHelper(0);
  }

  solveHelper(index: number): number {
    if (index >= this.array.length) return 0;

    if (this.memos.has(index)) return this.memos.get(index);

    const first = this.array[index] + this.solveHelper(index + 2);
    const second = this.solveHelper(index + 1);
    const result = Math.max(first, second);

    this.memos.set(index, result);

    return result;
  }

  solveIteratively(): number {
    this.memos = new Map<number, number>();

    if (this.array.length === 2) return Math.max(this.array[0], this.array[1]);
    if (this.array.length === 1) return this.array[0];
    if (this.array.length === 0) return 0;

    let currMax = Math.max(this.array[0], this.array[1]);
    this.memos.set(0, this.array[0]);
    this.memos.set(1, currMax);

    for (let i = 2; i < this.array.length; i++) {
      currMax = Math.max(this.array[i], this.array[i] + this.memos.get(i - 2), currMax);

      this.memos.set(i, currMax);
    }

    return currMax;
  }
}

const ad = new MaxSubsetSolver([1, -4, -5, 6, -93, -2, 9, -13]);
console.log(ad.solveIteratively());
console.log(ad.solveRecursively());
