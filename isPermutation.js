// Determine if two strings are permutations (rearrangements of the letters) of each other
function isPermutation(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let characters = {};
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i];

    if (typeof characters[char] === "undefined") {
      characters[char] = 0;
    }
    characters[char] += 1;
  }

  for (let i = 0; i < str2.length; i++) {
    let char = str2[i];

    if (typeof characters[char] === "undefined") {
      return false;
    } else {
      characters[char] -= 1;
    }
  }

  for (let key in characters) {
    if (!characters.hasOwnProperty(key)) continue;

    if (characters[key] > 0) {
      return false;
    }
  }
  return true;
}

console.log(isPermutation("are", "rea")); // true
console.log(isPermutation("hellol", "lloehl")); // true
console.log(isPermutation("hello", "there")); // false
