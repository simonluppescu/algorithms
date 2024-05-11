import assert from "./assert.js";
class Heap {
    isMax;
    array;
    constructor(isMax) {
        this.isMax = isMax;
        this.array = [];
    }
    add(num) {
        if (this.array.length === 0) {
            this.array.push(num);
            return;
        }
        this.array.push(num);
        let currIndex = this.array.length - 1;
        while (true) {
            if (currIndex === 0)
                break;
            const parentIndex = Math.floor((currIndex - 1) / 2);
            if (this.isMax
                ? this.array[currIndex] > this.array[parentIndex]
                : this.array[currIndex] < this.array[parentIndex]) {
                this.swap(currIndex, parentIndex);
                currIndex = parentIndex;
            }
            else {
                break;
            }
        }
    }
    remove(index) {
        if (this.array[index] === undefined)
            throw "Element not found";
        this.swap(index, this.array.length - 1);
        this.array.pop();
        let currIndex = index;
        while (true) {
            const leftIndex = 2 * currIndex + 1;
            const rightIndex = 2 * currIndex + 2;
            const indexToSwap = this.getIndexToSwap(this.array[currIndex], leftIndex, rightIndex);
            if (indexToSwap !== -1) {
                this.swap(currIndex, indexToSwap);
                currIndex = indexToSwap;
            }
            else {
                break;
            }
        }
    }
    getIndexToSwap(currValue, leftIndex, rightIndex) {
        let indexToSwap = -1;
        let minOrMax = currValue;
        const leftValue = this.array[leftIndex];
        const rightValue = this.array[rightIndex];
        if (leftValue !== undefined) {
            if (this.isMax ? leftValue > minOrMax : leftValue < minOrMax) {
                indexToSwap = leftIndex;
                minOrMax = leftValue;
            }
        }
        if (this.array[rightIndex] !== undefined) {
            if (this.isMax ? rightValue > minOrMax : rightValue < minOrMax) {
                indexToSwap = rightIndex;
                minOrMax = rightValue;
            }
        }
        return indexToSwap;
    }
    swap(index1, index2) {
        const tmp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = tmp;
    }
    toString() {
        return this.array.join(",");
    }
}
const heap = new Heap(true);
heap.add(5);
heap.add(4);
heap.add(3);
heap.add(2);
heap.add(1);
heap.add(2);
heap.add(8);
heap.add(5);
assert(heap.toString() === "8,5,5,4,1,2,3,2");
heap.remove(1);
assert(heap.toString() === "8,4,5,2,1,2,3");
heap.remove(1);
assert(heap.toString() === "8,3,5,2,1,2");
const heap2 = new Heap(false);
heap2.add(5);
heap2.add(4);
heap2.add(3);
heap2.add(2);
heap2.add(1);
heap2.add(2);
heap2.add(8);
heap2.add(5);
assert(heap2.toString() === "1,2,2,5,3,4,8,5");
heap2.remove(2);
assert(heap2.toString() === "1,2,4,5,3,5,8");
heap2.remove(5);
assert(heap2.toString() === "1,2,4,5,3,8");
console.log("All assertions passed.");
