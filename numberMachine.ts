/**
 * Category: MATH
 * Tags: easy arithmetic
 *
 * Given a string input with commands separated by spaces, compute values on a stack
 * based on commands. DUP will duplicate the top value on stack and push it. POP pops value.
 * + and - will pop top two values and perform that operation and then push result.
 * Getting a number will simply push that number. If value is not positive or is greater than the
 * max value of 2^20 - 1, then return -1. If there aren't enough numbers on stack to perform some
 * operation, then return -1.
 *
 * Example: 3 DUP 5 + - returns 5.
 * Example: 3 DUP 2 - - return -1 since the result of 2 - 3 is negative.
 */
import Stack from "./utils/stack";
import * as assert from "assert";

class Solver {
  MAX_VALUE = 2 ** 20;

  stack: Stack<number>;
  okayToContinue: boolean;

  constructor() {
    this.stack = new Stack<number>();
    this.okayToContinue = true;
  }

  compute(strInput: string): number {
    const commands = strInput.split(" ");
    for (const command of commands) {
      if (!this.okayToContinue) break;

      switch (command) {
        case "DUP": {
          this.duplicate();

          break;
        }
        case "POP": {
          this.pop();

          break;
        }
        case "+": {
          this.add();

          break;
        }
        case "-": {
          this.subtract();

          break;
        }
        default:
          this.addNumber(command);
          break;
      }
    }

    return this.okayToContinue && !this.stack.isEmpty() ? this.stack.peek() : -1;
  }

  duplicate(): void {
    const topElement = this.stack.peek();
    if (!this.isValid(topElement)) {
      this.okayToContinue = false;
      return;
    }

    this.stack.push(topElement);
  }

  pop(): void {
    const topElement = this.stack.pop();
    if (!this.isValid(topElement)) {
      this.okayToContinue = false;
      return;
    }
  }

  add(): void {
    this.performArithmetic((elem1, elem2) => elem1 + elem2);
  }

  subtract(): void {
    this.performArithmetic((elem1, elem2) => elem1 - elem2);
  }

  performArithmetic(operationFunc: (elem1: number, elem2: number) => number): void {
    const topElement = this.stack.pop();
    const secondElement = this.stack.pop();
    if (!this.isValid(topElement) || !this.isValid(secondElement)) {
      this.okayToContinue = false;
      return;
    }

    const result = operationFunc(topElement, secondElement);
    if (!this.isValid(result)) {
      this.okayToContinue = false;
      return;
    }

    this.stack.push(result);
  }

  addNumber(command: string): void {
    const element = parseInt(command);

    if (!this.isValid(element)) {
      this.okayToContinue = false;
      return;
    }

    this.stack.push(element);
  }

  isValid(value: number): boolean {
    return typeof value !== "undefined" && value >= 0 && value < this.MAX_VALUE;
  }
}

function solution(str: string): number {
  const solver = new Solver();

  const result = solver.compute(str);
  // console.log(result);
  return result;
}
// DONT COPY BELOW HERE

assert(solution("13 DUP 4 POP 5 DUP + DUP + -") === 7);
assert(solution("5 6 + +") === -1);
assert(solution("3 DUP 5 - -") === -1);
assert(solution("1048575 0 +") === 1048575);
assert(solution("10 20 -") === 10);
assert(solution("3 9 DUP -") === 0);
assert(solution("13 POP") === -1);
assert(solution("13 13 13 13") === 13);
assert(solution("1048575 1 +") === -1);
assert(solution("1048533 399 +") === -1);
assert(solution("1048576") === -1);
assert(solution("921392939") === -1);
assert(solution("-29") === -1);
assert(solution("10 4 -") === -1);
assert(solution("13 13 139 -129 929 921") === -1);
assert(solution("POP 299") === -1);
assert(solution("DUP 13 13") === -1);
assert(solution("DUP DUP DUP POP POP DUP") === -1);
console.log("All assertions passed");
