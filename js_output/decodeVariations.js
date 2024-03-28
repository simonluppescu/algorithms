/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion strings chars
 *
 * Given a string of digits, such as '1262', count the number of combinations of decoding each number into a letter,
 * where 'a' -> 1 and 'z' -> 26.
 * For example: '1262' can become 1 2 6 2, 12 6 2, 1 26 2, so the answer is 3.
 */
import { assert } from "console";
class Decoder {
    constructor() {
        this.seenValues = new Map();
    }
    decodeVariations(str) {
        if (this.seenValues[str])
            return this.seenValues[str];
        if (str[0] === "0")
            return 0;
        if (str === "")
            return 1;
        let count = 0;
        [1, 2].forEach((index) => {
            if (str.length >= index && this.isInRange(str.substring(0, index))) {
                count += this.decodeVariations(str.substring(index));
            }
        });
        this.seenValues[str] = count;
        return count;
    }
    isInRange(substr) {
        if (substr[0] === "0")
            return false;
        const num = parseInt(substr);
        return num > 0 && num <= 26;
    }
}
const decoder = new Decoder();
assert(decoder.decodeVariations("1262") === 3);
const decoder2 = new Decoder();
assert(decoder2.decodeVariations("1204") === 1);
const decoder3 = new Decoder();
assert(decoder3.decodeVariations("10032") === 0);
console.log("All assertions passed.");
