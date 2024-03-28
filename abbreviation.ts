/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: strings recursion
 *
 * You can perform the following operations on the string, A:
 *
 * Capitalize zero or more of A's lowercase letters.
 * Delete all of the remaining lowercase letters in A.
 * Given two strings, A and B, determine if it's possible to make A equal to B as described.
 * If so, print YES on a new line. Otherwise, print NO.
 */

// NOTE: This algorithm is not optimal. It will timeout for very large strings.
import { assert } from "console";

class Abbreviator {
  memos: Map<string, boolean>;

  evaluate(a: string, b: string): boolean {
    this.memos = new Map<string, boolean>();

    return this.run(a, b);
  }

  run(a: string, b: string): boolean {
    // Check if it is memoized
    if (this.memos.has(a)) return this.memos.get(a);

    // Base cases
    if (a.length < b.length) return false;
    const filteredUpper = (a.match(/[A-Z]/g) || []).join("");
    if (filteredUpper === b) return true;
    if (filteredUpper.length >= b.length && filteredUpper !== b) return false;

    // Body
    const firstLowerIndex = a.match(/[a-z]/).index;

    const taken = `${a.slice(0, firstLowerIndex)}${a.slice(
      firstLowerIndex + 1
    )}`;
    const upperCased = a.replace(/[a-z]/, a[firstLowerIndex].toUpperCase());

    // Memoize
    const result = this.run(taken, b) || this.run(upperCased, b);
    this.memos.set(a, result);

    // Done
    return result;
  }
}

const foo = new Abbreviator();
assert(foo.evaluate("bBccC", "BBC"));
assert(foo.evaluate("bBccC", "BC"));
assert(foo.evaluate("bfBccC", "BC"));
assert(foo.evaluate("bfBccC", "BBC"));
assert(foo.evaluate("bccC", "BC"));
assert(foo.evaluate("bBccC", "BCC"));
console.log("All assertions passed.");
