class Queue<T> {
  protected array: T[];

  constructor() {
    this.array = new Array<T>();
  }

  enqueue(value: T): void {
    this.array.push(value);
  }

  dequeue(): T {
    return this.array.splice(0, 1)[0];
  }

  peek(): T {
    return this.array[0];
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}

export default Queue;
