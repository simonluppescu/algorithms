import assertArrayEquals from "./utils/assertArray.js";

/**
 * Category: STRINGS
 * Tags: recursion
 *
 * Generate all permutations of a string where all letters are unique.
 *
 * Also generate all permutations where the letters are not necessarily unique.
 */
function generatePermutations(str: string): Array<string> {
  const result: Array<string> = [];

  generateHelper(str, "", result);

  return result;
}

function generateHelper(remaining: string, newStr: string, result: Array<string>) {
  if (remaining === "") {
    result.push(newStr);
  }

  for (let i = 0; i < remaining.length; i++) {
    generateHelper(
      remaining.substring(0, i) + remaining.substring(i + 1),
      newStr + remaining[i],
      result
    );
  }
}

export type Counts = {
  [letter: string]: number;
};

function generatePermutationsDup(str: string): Array<string> {
  const result: Array<string> = [];

  const counts: Counts = {};
  for (let i = 0; i < str.length; i++) {
    if (counts[str[i]] === undefined) {
      counts[str[i]] = 0;
    }
    counts[str[i]] += 1;
  }

  generateHelperDup(counts, "", result);

  return result;
}

function generateHelperDup(remaining: Counts, newStr: string, result: Array<string>) {
  if (Object.values(remaining).every((val) => val === 0)) {
    result.push(newStr);
  }

  for (let letter in remaining) {
    if (remaining[letter] > 0) {
      const newRemaining: Counts = Object.assign({}, remaining);
      newRemaining[letter] -= 1;

      generateHelperDup(newRemaining, newStr + letter, result);
    }
  }
}

assertArrayEquals(generatePermutations("hel"), ["hel", "hle", "ehl", "elh", "lhe", "leh"]);

assertArrayEquals(generatePermutationsDup("aaab"), ["aaab", "aaba", "abaa", "baaa"]);
assertArrayEquals(generatePermutationsDup("aaaaa"), ["aaaaa"]);

console.log("All assertions passed");
