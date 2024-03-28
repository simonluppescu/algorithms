/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion
 *
 * Given a set of coins with numerical values, compute the minimum number of coins that are used to sum to a given amount.
 * For example, for coins 5, 2, 1, and an amount 8, the answer is 3 coins.
 */
import { assert } from "console";

class Changer {
  coins: number[];

  constructor(coins: number[]) {
    this.coins = coins;
  }

  compute(remaining: number): number {
    if (this.coins.includes(remaining)) return 1;
    if (remaining === 0) return 0;
    if (remaining < 0) return -1;

    const results = [];
    this.coins.forEach((coin) => {
      const result = this.compute(remaining - coin);
      if (result !== -1) {
        results.push(result + 1);
      }
    });

    return results.length > 0 ? Math.min(...results) : -1;
  }
}

class ChangerMemoized {
  coins: number[];
  storedValues: { [val: number]: number };

  constructor(coins: number[]) {
    this.coins = coins;
    this.storedValues = {};
  }

  compute(remaining: number): number {
    if (this.coins.includes(remaining)) return 1;
    if (remaining === 0) return 0;
    if (remaining < 0) return -1;

    if (this.storedValues[remaining]) return this.storedValues[remaining];

    const results = [];
    this.coins.forEach((coin) => {
      const result = this.compute(remaining - coin);
      if (result !== -1) {
        results.push(result + 1);
      }
    });

    const finalResult = results.length > 0 ? Math.min(...results) : -1;

    this.storedValues[remaining] = finalResult;

    return finalResult;
  }
}

assert(new Changer([8, 6, 1]).compute(12) === 2);
assert(new Changer([5, 2, 1]).compute(11) === 3);
assert(new Changer([1, 2, 3]).compute(0) === 0);
assert(new Changer([5, 3]).compute(4) === -1);

assert(new ChangerMemoized([1, 2, 5]).compute(100) === 20);
assert(new ChangerMemoized([4, 3, 1]).compute(123) === 31);

console.log("All assertions passed.");
