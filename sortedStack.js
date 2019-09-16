class Stack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    if (this.stack.length === 0) {
      this.stack.push(value);
      return;
    }

    let tmp_stack = [];
    while (this.stack.length >= 1 && value > this.peek()) {
      tmp_stack.push(this.pop());
    }
    this.stack.push(value);

    while (tmp_stack.length >= 1) {
      this.stack.push(tmp_stack.pop());
    }
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  print() {
    console.log(this.stack);
  }
}


let s = new Stack();
s.push(10);
s.push(1);
s.push(3);
s.push(5);
s.push(12);
s.print();
