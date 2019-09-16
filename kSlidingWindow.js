const assertArrayEquals = require("./assertArray");
const Dequeue = require("./dequeue");

class Slider {
  constructor(arr, windowSize) {
    this.array = arr;
    this.k = windowSize;

    this.queue = new Dequeue();
    this.maxArray = [];
  }

  run() {
    for (let i = 0; i < this.array.length; i++) {
      const currValue = this.array[i];
      console.log(`Current value is ${currValue}`); // CONSOLE LOG ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // If sliding window moves past the index at the front of the queue
      if (i - this.k === this.queue.peekFront()) {
        // we have to remove it since it's no longer part of the window
        this.queue.popFront();
      }

      // If the queue is empty, we don't need to check anything so we add it.
      if (this.queue.isEmpty()) {
        this.queue.pushFront(i);
      } // If the currValue is greater than the front, thus greater than all the elements in the queue
      else if (currValue > this.array[this.queue.peekFront()]) {
        // we have to remove all the elements since they can never become the maximum later
        this.queue.clear();
        // then add current index to the front. It is now the only element in the queue.
        this.queue.pushFront(i);
      } // If the currValue is less than the back
      else if (currValue <= this.array[this.queue.peekBack()]) {
        // we add it to the back because it's possible it could be the next maximum at a later step
        this.queue.pushBack(i);
      } // If the currValue is greater than the back
      else if (currValue > this.array[this.queue.peekBack()]) {
        // We need to remove elements from the back that are less than the currValue because they can never be
        // the maximum.
        while (currValue > this.array[this.queue.peekBack()]) {
          this.queue.popBack();
        }
        // After we've removed all elements that are less, we can add the current index
        this.queue.pushBack(i);
      }
      console.log(this.queue); // CONSOLE LOG ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      // Now we can print the maximum at this step
      if (i >= this.k - 1) {
        this.addMax();
      }
    }

    return this.maxArray;
  }

  addMax() {
    this.maxArray.push(this.array[this.queue.peekFront()]);
  }
}

let s = new Slider([9, 10, 3, 4, 8, 13, 14, 9, 2], 4);
assertArrayEquals(s.run(), [10, 10, 13, 14, 14, 14]);

s = new Slider([9, 10, 3, 4, 8, 7, 6, 5, 2], 4);
assertArrayEquals(s.run(), [10, 10, 8, 8, 8, 7]);

s = new Slider([13, 12, 12, 12, 12, 12, 12], 3);
assertArrayEquals(s.run(), [13, 12, 12, 12, 12]);

s = new Slider([1, 4, 6, 2, 6, 2, 9, 12, 10], 1);
assertArrayEquals(s.run(), [1, 4, 6, 2, 6, 2, 9, 12, 10]);

s = new Slider([10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 3);
assertArrayEquals(s.run(), [10, 9, 8, 7, 6, 5, 4, 3]);

s = new Slider([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
assertArrayEquals(s.run(), [3, 4, 5, 6, 7, 8, 9, 10]);

s = new Slider([10, 1, 1, 1, 10, 1, 1, 1, 1, 10, 1, 1], 4);
assertArrayEquals(s.run(), [10, 10, 10, 10, 10, 1, 10, 10, 10]);

s = new Slider([1, 4, 6, 2, 8, 3, 5], 7);
assertArrayEquals(s.run(), [8]);

console.log("Done.");
