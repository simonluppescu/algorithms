/**
 * Category: STRINGS
 * Tags: maps anagrams
 *
 * Given a string S and a smaller string T, check if an anagram of T exists in S.
 */
import * as assert from "assert";

class Solver {
  str: string;
  charChecker: Map<string, number>;
  charsLeft: number;

  constructor(s: string) {
    this.str = s;
  }

  hasAnagramSubstring(small: string): boolean {
    const smallCharacters = new Map<string, number>();
    for (let i = 0; i < small.length; i++) {
      const char = small[i];
      if (!smallCharacters.has(char)) smallCharacters.set(char, 0);

      smallCharacters.set(char, smallCharacters.get(char) + 1);
    }
    this.resetChecker(smallCharacters, small.length);

    for (let i = 0; i < this.str.length; i++) {
      const char = this.str[i];
      // console.log(this.charChecker);

      if (!this.charChecker.has(char)) {
        this.resetChecker(smallCharacters, small.length);
      } else if (this.charChecker.get(char) === 0) {
        this.resetChecker(smallCharacters, small.length);
        i--;
      } else {
        this.charChecker.set(char, this.charChecker.get(char) - 1);
        this.charsLeft--;

        if (this.isComplete()) return true;
      }
    }

    return false;
  }

  resetChecker(smallCharacters: Map<string, number>, numCharsSmall: number): void {
    this.charChecker = new Map<string, number>(smallCharacters);
    this.charsLeft = numCharsSmall;
  }

  isComplete(): boolean {
    return this.charsLeft === 0;
  }
}

const solver = new Solver("asasfasasdfaa");
assert(solver.hasAnagramSubstring("sad"));
assert(solver.hasAnagramSubstring("saf"));
assert(!solver.hasAnagramSubstring("sass"));
assert(solver.hasAnagramSubstring("f"));
assert(solver.hasAnagramSubstring("ssaaafsadsaaf"));

const fastTester = new Solver(
  "aksdfhkjasdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbhqwhsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashdusdfalksjdflkadsjfklahjkheghahskjdhgjhasndkbaspdfasdfhkjawhegashduerurofdasdlkfhaksjdfhkahsdkhaskjdvkjaskdkrhkasiefhahsdjkfjasjdfhhashdfkakjshdfhkaweogasdgfpasoieuaiowhfkajskdfspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewberurofdspsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbvdmkvdmsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbsdfhkjawhegashduerurofdspvdmkvdmvjdshdfsuewjewbfweiufhkajfakjsf"
);
assert(!fastTester.hasAnagramSubstring("wwei"));
assert(fastTester.hasAnagramSubstring("asd"));

console.log("All assertions passed.");
