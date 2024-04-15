/**
 * Category: ARRAYS
 * Tags: binary_search sorted_arrays
 *
 * You are given an array-like data structure Listy which lacks a size
 * method. It does, however, have an elementAt (i) method that returns the element at index i in
 * 0(1) time. If i is beyond the bounds of the data structure, it returns -1. (For this reason, the data
 * structure only supports positive integers .) Given a Listy which contains sorted, positive integers,
 * find the index at which an element x occurs. If x occurs multiple times, you may return any index.
 */
import { assert } from "console";

class Listy extends Array<number> {
  public elementAt(index: number): number {
    if (index >= this.length) {
      return -1;
    } else {
      return this[index];
    }
  }

  constructor(...items: Array<number>) {
    if (items.length === 1) {
      super();
      this.push(items[0]);
    } else {
      super(...items);
    }
  }
}

function findInt(nums: Listy, target: number): number {
  let upper = target;
  let lower = 0;
  while (upper !== lower) {
    let mid = Math.floor((upper + lower) / 2);
    if (nums.elementAt(mid) === target) {
      return mid;
    }

    if (nums.elementAt(mid) === -1) {
      upper = mid;
    } else if (nums.elementAt(mid) < target) {
      lower = mid + 1;
    } else if (nums.elementAt(mid) > target) {
      upper = mid;
    }
  }

  return nums.elementAt(upper) === target ? upper : -1;
}

assert(findInt(new Listy(1, 3, 5, 9), 1) === 0);
assert(findInt(new Listy(1, 3, 5, 9), 3) === 1);
assert(findInt(new Listy(1, 3, 5, 9), 5) === 2);
assert(findInt(new Listy(1, 3, 5, 9), 9) === 3);
assert(findInt(new Listy(1, 3, 5, 9), 13) === -1);
assert(findInt(new Listy(1), 1) === 0);
assert(findInt(new Listy(1), 2) === -1);
assert([2, 3, 4].includes(findInt(new Listy(1, 3, 5, 5, 5, 9), 5)));

console.log("All assertions passed.");
