class Dequeue {
  array: any[];

  constructor() {
    this.array = [];
  }

  pushFront(value: any): void {
    this.array.splice(0, 0, value);
  }

  popFront(): any {
    return this.array.splice(0, 1);
  }

  peekFront(): any {
    return this.array[0];
  }

  pushBack(value: any): void {
    this.array.push(value);
  }

  popBack(): any {
    return this.array.pop();
  }

  peekBack(): any {
    return this.array[this.array.length - 1];
  }

  clear(): void {
    while (!this.isEmpty()) {
      this.popFront();
    }
  }

  length(): number {
    return this.array.length;
  }

  isEmpty(): boolean {
    return this.length() === 0;
  }
}

export default Dequeue;
