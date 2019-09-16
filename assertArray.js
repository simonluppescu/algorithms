const assert = require("assert");

function assertArrayEquals(array1, array2) {
  assert(array1.length === array2.length);

  for (let i = 0; i < array1.length; i++) {
    assert(array1[i] === array2[i]);
  }
  console.log(`Assertion: ${array1} PASSED.`);
}

module.exports = assertArrayEquals;
