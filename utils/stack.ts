class Stack<T> {
  private stack: T[];

  constructor() {
    this.stack = new Array<T>();
  }

  push(val: T): void {
    this.stack.push(val);
  }

  pop(): T {
    return this.stack.pop();
  }

  peek(): T {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}

export default Stack;
