"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: STRINGS
 * Tags: maps anagrams
 *
 * Given a string S and a smaller string T, check if an anagram of T exists in S.
 */
var assert = require("assert");
var Solver = /** @class */ (function () {
    function Solver(s) {
        this.str = s;
    }
    Solver.prototype.hasAnagramSubstring = function (small) {
        var smallCharacters = new Map();
        for (var i = 0; i < small.length; i++) {
            var char = small[i];
            if (!smallCharacters.has(char))
                smallCharacters.set(char, 0);
            smallCharacters.set(char, smallCharacters.get(char) + 1);
        }
        this.resetChecker(smallCharacters, small.length);
        for (var i = 0; i < this.str.length; i++) {
            var char = this.str[i];
            // console.log(this.charChecker);
            if (!this.charChecker.has(char)) {
                this.resetChecker(smallCharacters, small.length);
            }
            else if (this.charChecker.get(char) === 0) {
                this.resetChecker(smallCharacters, small.length);
                i--;
            }
            else {
                this.charChecker.set(char, this.charChecker.get(char) - 1);
                this.charsLeft--;
                if (this.isComplete())
                    return true;
            }
        }
        return false;
    };
    Solver.prototype.resetChecker = function (smallCharacters, numCharsSmall) {
        this.charChecker = new Map(smallCharacters);
        this.charsLeft = numCharsSmall;
    };
    Solver.prototype.isComplete = function () {
        return this.charsLeft === 0;
    };
    return Solver;
}());
var solver = new Solver("asasfasasdfaa");
assert(solver.hasAnagramSubstring("sad"));
assert(solver.hasAnagramSubstring("saf"));
assert(!solver.hasAnagramSubstring("sass"));
assert(solver.hasAnagramSubstring("f"));
assert(solver.hasAnagramSubstring("ssaaafsadsaaf"));
var fastTester = new Solver("aksdfhkjasdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbhqwhsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashdusdfalksjdflkadsjfklahjkheghahskjdhgjhasndkbaspdfasdfhkjawhegashduerurofdasdlkfhaksjdfhkahsdkhaskjdvkjaskdkrhkasiefhahsdjkfjasjdfhhashdfkakjshdfhkaweogasdgfpasoieuaiowhfkajskdfspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewberurofdspsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbvdmkvdmsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbfweiufhkajfakjsf");
assert(!fastTester.hasAnagramSubstring("wwei"));
assert(fastTester.hasAnagramSubstring("asd"));
console.log("All assertions passed.");
