/**
 * Category: STRINGS
 * Tags: maps simple easy
 *
 * Determine if every character in a string is unique
 */

import * as assert from "assert";

function isUnique(str): boolean {
  const characters = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (characters[char]) {
      return false;
    } else {
      characters[char] = true;
    }
  }

  return true;
}

assert(isUnique("hello") === false);
assert(isUnique("poqieal") === true);
console.log("All assertions passed.");
