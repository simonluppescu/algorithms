/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion stacks
 *
 * Solve the Tower of Hanoi game
 * This solution uses dynamic programming to break the problem into smaller
 * problems. This one should be more efficient than the other one.. although there
 * is no memoization happening here..
 *
 */
import Stack from "./utils/stack.js";

class Tower extends Stack<number> {
  toString(): string {
    return `|${this.stack.join(" ")}|`;
  }
}

function solve(height: number, origin: Tower, buffer: Tower, dest: Tower): Tower {
  if (height === 2) {
    move(origin, buffer);
    move(origin, dest);
    move(buffer, dest);
    return;
  }
  console.log(origin.toString(), buffer.toString(), dest.toString());

  solve(height - 1, origin, dest, buffer);

  move(origin, dest);

  solve(height - 1, buffer, origin, dest);

  return dest;
}

function move(origin: Tower, dest: Tower): void {
  dest.push(origin.pop());
}

function run(height: number): void {
  const origin = new Tower();
  for (let i = height; i > 0; i--) {
    origin.push(i);
  }
  const result = solve(height, origin, new Tower(), new Tower());

  console.log("Destination is now", result.toString());
}

run(5);
