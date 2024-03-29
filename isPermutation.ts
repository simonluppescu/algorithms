/**
 * Category: STRINGS
 * Tags: iteration maps
 *
 * Determine if two strings are permutations (rearrangements of the letters) of each other.
 */
import { assert } from "console";

function isPermutation(str1, str2): boolean {
  if (str1.length !== str2.length) {
    return false;
  }

  const characters = {};
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];

    if (typeof characters[char] === "undefined") {
      characters[char] = 0;
    }
    characters[char] += 1;
  }

  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];

    if (typeof characters[char] === "undefined") {
      return false;
    } else {
      characters[char] -= 1;
    }
  }

  for (const key in characters) {
    if (!characters.hasOwnProperty(key)) continue;

    if (characters[key] > 0) {
      return false;
    }
  }
  return true;
}

assert(isPermutation("are", "rea") === true);
assert(isPermutation("hellol", "lloehl") === true);
assert(isPermutation("hello", "there") === false);
console.log("All assertions passed.");
