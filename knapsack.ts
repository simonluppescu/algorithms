/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion maps algorithms
 *
 * Given a set of objects, each of which has a weight and a monetary value,
 * put as many objects into a knapsack with a weight limit where the total value
 * of all the objects is the highest possible.
 */
import * as assert from "assert";

class Packer {
  values: number[];
  weights: number[];
  memos: Map<number, Map<number, number>>;

  constructor(v: number[], w: number[]) {
    this.values = v;
    this.weights = w;

    if (this.values.length !== this.weights.length) {
      throw "Values and Weights must be the same length";
    }

    this.memos = new Map<number, Map<number, number>>();
  }

  pack(capacity: number): number {
    return this.packHelper(this.values.length - 1, capacity);
  }

  private packHelper(index: number, capacity: number): number {
    if (index < 0 || capacity === 0) return 0;

    if (this.alreadyCalculated(index, capacity)) {
      return this.memos.get(index).get(capacity);
    }

    let result;
    if (this.weights[index] > capacity) {
      result = this.packHelper(index - 1, capacity);
    } else {
      const addedValue = this.packHelper(index - 1, capacity - this.weights[index]) + this.values[index];
      const notAddedValue = this.packHelper(index - 1, capacity);
      result = Math.max(addedValue, notAddedValue);
    }

    this.memoizeResult(index, capacity, result);

    return result;
  }

  private alreadyCalculated(index: number, capacity: number): boolean {
    return this.memos.has(index) && this.memos.get(index).has(capacity);
  }

  private memoizeResult(index: number, capacity: number, result: number): void {
    if (!this.memos.has(index)) {
      this.memos.set(index, new Map<number, number>());
    }
    this.memos.get(index).set(capacity, result);
  }
}

const p = new Packer([1, 2, 12, 10], [1, 2, 6, 7]);
assert(p.pack(12) === 15);

const p2 = new Packer([1, 2, 3, 2, 5, 6, 3, 2, 1, 2, 3, 1, 2], [1, 2, 3, 4, 6, 3, 4, 2, 4, 2, 4, 2, 1]);
assert(p.pack(10) === 14);

console.log("All assertions passed");
