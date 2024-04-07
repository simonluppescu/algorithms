/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion
 *
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps.
 * In how many distinct ways can you climb to the top?
 */
import { assert } from "console";
function climbStairs(n) {
    if (n === 0) {
        return 1;
    }
    else if (n < 0) {
        return 0;
    }
    let count = 0;
    for (let i = 1; i <= 2; i++) {
        count += climbStairs(n - i);
    }
    return count;
}
const memos = new Map();
function climbStairsMemoized(n) {
    if (n === 0) {
        return 1;
    }
    else if (n < 0) {
        return 0;
    }
    if (memos.has(n)) {
        return memos.get(n);
    }
    let count = 0;
    for (let i = 1; i <= 2; i++) {
        count += climbStairsMemoized(n - i);
    }
    memos.set(n, count);
    return count;
}
assert(climbStairs(1) === 1);
assert(climbStairs(2) === 2);
assert(climbStairs(3) === 3);
assert(climbStairs(4) === 5);
assert(climbStairs(5) === 8);
assert(climbStairsMemoized(1) === 1);
assert(climbStairsMemoized(2) === 2);
assert(climbStairsMemoized(3) === 3);
assert(climbStairsMemoized(4) === 5);
assert(climbStairsMemoized(5) === 8);
assert(climbStairsMemoized(45) === 1836311903);
console.log("All assertions passed");
