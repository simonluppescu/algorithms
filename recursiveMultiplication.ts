function multiply(num1: number, num2: number): number {
  return multiplyHelper(num1, num1, num2 - 1);
}

function multiplyHelper(total: number, num1: number, numLeft: number): number {
  if (numLeft > 0) {
    return multiplyHelper(total + num1, num1, numLeft - 1);
  } else {
    return total;
  }
}

console.log(multiply(3, 4));
