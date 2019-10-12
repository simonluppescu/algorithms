import * as assert from "assert";

class Searcher {
  array: number[];
  currValue: number;
  lowerBound: number;
  upperBound: number;
  currIndex: number;
  counter: number;

  constructor(array: number[]) {
    this.array = array;
  }

  getIndex(target: number): number {
    this.reset();

    // this.print(target);
    while (this.currValue !== target) {
      if (this.currValue < target) {
        this.lowerBound = this.currIndex + 1;
      } else if (this.currValue > target) {
        this.upperBound = this.currIndex;
      }

      if (this.lowerBound === this.upperBound) break;

      this.nextStep();
      // this.print(target);
    }

    return this.currValue === target ? this.currIndex : -1;
  }

  nextStep(): void {
    this.currIndex = Math.floor((this.upperBound - 1 + this.lowerBound) / 2);
    this.currValue = this.array[this.currIndex];
    this.counter++;
  }

  reset(): void {
    this.counter = 0;
    this.upperBound = this.array.length;
    this.lowerBound = 0;
    this.nextStep();
  }

  print(target: number): void {
    console.log(
      `Lower: ${this.lowerBound}, Upper: ${this.upperBound}, currI: ${this.currIndex}, curr: ${this.currValue}, target: ${target}`
    );
  }
}

const firstTest = [1, 2, 3, 4, 6, 8, 9, 12, 15, 19, 34, 54, 59, 100];
const s = new Searcher(firstTest);
firstTest.forEach((value, index) => {
  assert(s.getIndex(value) === index);
  console.log(`${value} is indeed at ${index}. Found in ${s.counter} steps.`);
});
console.log("Done.");
