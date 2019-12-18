/**
 * Category: STRINGS
 * Tags: iteration
 *
 * Given a string, return another string with counts of each character in order.
 * For example: "aaabcc" => "a3b1c2"
 */
import * as assert from "assert";

function compress(str: string): string {
  if (str.length === 0) return "";

  let result = "";

  let currChar = str[0];
  let currCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === currChar) {
      currCount += 1;
    } else {
      result = `${result}${currChar}${currCount}`;

      currChar = str[i];
      currCount = 1;
    }
  }

  result = `${result}${currChar}${currCount}`;

  return result;
}

assert(compress("aaabcc") === "a3b1c2");
assert(compress("abaacaaaddaa") === "a1b1a2c1a3d2a2");
assert(compress("") === "");
console.log("All assertions passed.");
