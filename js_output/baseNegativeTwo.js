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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var NotOptimalSolver = /** @class */ (function () {
    function NotOptimalSolver(arr) {
        this.bitArray = arr;
        this.bitValues = [];
        this.decimalInput = this.computeInput();
        this.decimalOutput = Math.ceil(this.decimalInput / 2);
    }
    NotOptimalSolver.prototype.computeInput = function () {
        var _this = this;
        var sum = 0;
        this.bitArray.forEach(function (bit, index) {
            if (bit === 0)
                return;
            var decimalValue;
            if (!_this.bitValues[index]) {
                decimalValue = Math.pow(-2, index);
                _this.bitValues[index] = decimalValue;
            }
            else {
                decimalValue = _this.bitValues[index];
            }
            sum += decimalValue;
        });
        return sum;
    };
    NotOptimalSolver.prototype.bitOutput = function (overriddenInput) {
        if (overriddenInput === void 0) { overriddenInput = null; }
        if (overriddenInput)
            this.decimalOutput = overriddenInput;
        var indexToStart = 0;
        var positiveSum = 0;
        while (positiveSum < this.decimalOutput) {
            var decimalValue = void 0;
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
    };
    NotOptimalSolver.prototype.computeHelper = function (arr, index, sum) {
        if (index === -1) {
            return sum === this.decimalOutput ? arr.slice(1) : null;
        }
        var firstArr = __spread(arr, [1]);
        var secondArr = __spread(arr, [0]);
        return (this.computeHelper(firstArr, index - 1, sum + this.bitValues[index]) ||
            this.computeHelper(secondArr, index - 1, sum));
    };
    return NotOptimalSolver;
}());
var OptimalSolver = /** @class */ (function () {
    function OptimalSolver(arr) {
        this.bitValues = [];
        this.decimalInput = this.computeInput(arr);
        this.decimalOutput = Math.ceil(this.decimalInput / 2);
    }
    OptimalSolver.prototype.computeInput = function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
                sum += Math.pow(-2, arr.length - i - 1);
            }
        }
        return sum;
    };
    /**
     * Start with decimal number. Continuously divide by -2 (the base) and append the remainder
     * to the result. However, if that remainder is negative, we convert it to positive by adding
     * the abs(base) to the remainder and then adding one to the number.
     * When constructing base N of something, start from the right and go left.
     */
    OptimalSolver.prototype.computeBaseNegativeTwo = function () {
        var n = this.decimalOutput;
        if (n === 0)
            return [0];
        var result = [];
        while (n !== 0) {
            var remainder = n % -2;
            n = this.truncate(n / -2);
            if (remainder < 0) {
                remainder += 2;
                n += 1;
            }
            result.splice(0, 0, Math.abs(remainder));
        }
        return result;
    };
    OptimalSolver.prototype.truncate = function (num) {
        if (num < 0) {
            return Math.ceil(num);
        }
        else {
            return Math.floor(num);
        }
    };
    return OptimalSolver;
}());
var s = new OptimalSolver([1, 0, 1, 1, 0]);
console.log(s.computeBaseNegativeTwo());
