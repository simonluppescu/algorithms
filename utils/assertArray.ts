import { assert } from "console";

function assertArrayEquals(array1: any[], array2: any[]): void {
  assert(array1.length === array2.length);

  for (let i = 0; i < array1.length; i++) {
    assert(array1[i] === array2[i]);
  }
  console.log(`Assertion: ${array1} PASSED.`);
}

export default assertArrayEquals;
