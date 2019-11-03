/**
 * Category: RECURSION
 * Tags: recursion simple math
 *
 * Multiply two numbers without using multiply operator.
 */
function multiply(num1, num2) {
    return multiplyHelper(num1, num1, num2 - 1);
}
function multiplyHelper(total, num1, numLeft) {
    if (numLeft > 0) {
        return multiplyHelper(total + num1, num1, numLeft - 1);
    }
    else {
        return total;
    }
}
console.log(multiply(3, 4));
