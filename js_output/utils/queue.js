class Queue {
    constructor() {
        this.array = new Array();
    }
    enqueue(value) {
        this.array.push(value);
    }
    dequeue() {
        return this.array.splice(0, 1)[0];
    }
    clear() {
        while (!this.isEmpty()) {
            this.dequeue();
        }
    }
    peek() {
        return this.array[0];
    }
    isEmpty() {
        return this.array.length === 0;
    }
}
export default Queue;
