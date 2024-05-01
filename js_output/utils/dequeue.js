class Dequeue {
    array;
    constructor() {
        this.array = [];
    }
    pushFront(value) {
        this.array.splice(0, 0, value);
    }
    popFront() {
        return this.array.splice(0, 1);
    }
    peekFront() {
        return this.array[0];
    }
    pushBack(value) {
        this.array.push(value);
    }
    popBack() {
        return this.array.pop();
    }
    peekBack() {
        return this.array[this.array.length - 1];
    }
    clear() {
        while (!this.isEmpty()) {
            this.popFront();
        }
    }
    length() {
        return this.array.length;
    }
    isEmpty() {
        return this.length() === 0;
    }
}
export default Dequeue;
