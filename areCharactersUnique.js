// Determine if every character in a string is unique
function isUnique(str) {
  let characters = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (characters[char]) {
      return false;
    } else {
      characters[char] = true;
    }
  }

  return true;
}

console.log(isUnique("hello")); // false
console.log(isUnique("poqieal")); // true
