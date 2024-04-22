function assert(expression: boolean): void {
  if (!expression) {
    throw "ASSERTION FAILED";
  }
}

export default assert;
