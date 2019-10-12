class Stack {
  private stack: any[];

  constructor() {
    this.stack = [];
  }

  push(val): void {
    this.stack.push(val);
  }

  pop(): any {
    return this.stack.pop();
  }

  peek(): any {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}

export default Stack;
