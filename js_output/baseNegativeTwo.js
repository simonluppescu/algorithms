/**
 * Category: BIT_MANIPULATION
 * Tags: bits math exponents
 *
 * In base -2, each digit is a power of -2:
 * ... -32 16 -8 4 -2 1
 * so the number 9 would be 11001 in base -2.
 *
 * Given the base -2 number of something, compute the Math.ceil(decimal / 2) and
 * give the base -2 of that.
 * Input: 11001 (9)
 * Output: 101 (5)
 */
class NotOptimalSolver {
    bitArray;
    bitValues;
    decimalInput;
    decimalOutput;
    constructor(arr) {
        this.bitArray = arr;
        this.bitValues = [];
        this.decimalInput = this.computeInput();
        this.decimalOutput = Math.ceil(this.decimalInput / 2);
    }
    computeInput() {
        let sum = 0;
        this.bitArray.forEach((bit, index) => {
            if (bit === 0)
                return;
            let decimalValue;
            if (!this.bitValues[index]) {
                decimalValue = Math.pow(-2, index);
                this.bitValues[index] = decimalValue;
            }
            else {
                decimalValue = this.bitValues[index];
            }
            sum += decimalValue;
        });
        return sum;
    }
    bitOutput(overriddenInput = null) {
        if (overriddenInput)
            this.decimalOutput = overriddenInput;
        let indexToStart = 0;
        let positiveSum = 0;
        while (positiveSum < this.decimalOutput) {
            let decimalValue;
            if (!this.bitValues[indexToStart]) {
                decimalValue = Math.pow(-2, indexToStart);
                this.bitValues[indexToStart] = decimalValue;
            }
            else {
                decimalValue = this.bitValues[indexToStart];
            }
            if (decimalValue > 0) {
                positiveSum += decimalValue;
            }
            indexToStart++;
        }
        return this.computeHelper([], indexToStart, 0).reverse();
    }
    computeHelper(arr, index, sum) {
        if (index === -1) {
            return sum === this.decimalOutput ? arr.slice(1) : null;
        }
        const firstArr = [...arr, 1];
        const secondArr = [...arr, 0];
        return (this.computeHelper(firstArr, index - 1, sum + this.bitValues[index]) ||
            this.computeHelper(secondArr, index - 1, sum));
    }
}
class OptimalSolver {
    bitValues;
    decimalInput;
    decimalOutput;
    constructor(arr) {
        this.bitValues = [];
        this.decimalInput = this.computeInput(arr);
        this.decimalOutput = Math.ceil(this.decimalInput / 2);
    }
    computeInput(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
                sum += Math.pow(-2, arr.length - i - 1);
            }
        }
        return sum;
    }
    /**
     * Start with decimal number. Continuously divide by -2 (the base) and append the remainder
     * to the result. However, if that remainder is negative, we convert it to positive by adding
     * the abs(base) to the remainder and then adding one to the number.
     * When constructing base N of something, start from the right and go left.
     */
    computeBaseNegativeTwo() {
        let n = this.decimalOutput;
        if (n === 0)
            return [0];
        const result = [];
        while (n !== 0) {
            let remainder = n % -2;
            n = this.truncate(n / -2);
            if (remainder < 0) {
                remainder += 2;
                n += 1;
            }
            result.splice(0, 0, Math.abs(remainder));
        }
        return result;
    }
    truncate(num) {
        if (num < 0) {
            return Math.ceil(num);
        }
        else {
            return Math.floor(num);
        }
    }
}
const s = new OptimalSolver([1, 0, 1, 1, 0]);
console.log(s.computeBaseNegativeTwo());
