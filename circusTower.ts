/**
 * Category: DYNAMIC_PROGRAMMING
 * Tags: recursion traveling_salesman
 *
 * A circus is designing a tower routine consisting of people standing atop one
 * another's shoulders. For practical and aesthetic reasons, each person must
 * be both shorter and lighter than the person below him or her. Given the
 * heights and weights of each person in the circus, write a method to
 * compute the largest possible number of people in such a tower.
 */
import assert from "./utils/assert.js";

function circusTower(people: Array<Array<number>>) {
  const peopleSorted = people.sort((a, b) => b[0] - a[0]);

  return circusHelper(peopleSorted, null, 0);
}

// This should probably be memoized but it's not right now.
function circusHelper(
  people: Array<Array<number>>,
  lastPerson: Array<number>,
  towerHeight: number
): number {
  if (people.length === 0) return towerHeight;

  const currPerson = people[0];
  const [height, weight] = currPerson;
  const [lastHeight, lastWeight] = lastPerson ?? [];

  const possibilities = [towerHeight];
  if (lastPerson !== null) {
    possibilities.push(circusHelper(people.slice(1), lastPerson, towerHeight));
  }
  if (lastPerson === null || (height < lastHeight && weight < lastWeight)) {
    possibilities.push(circusHelper(people.slice(1), currPerson, towerHeight + 1));
  }

  return Math.max(...possibilities);
}

assert(
  circusTower([
    [65, 100],
    [70, 150],
    [56, 90],
    [75, 190],
    [60, 95],
    [68, 110]
  ]) === 6
);

assert(
  circusTower([
    [65, 100],
    [70, 120],
    [56, 90],
    [75, 190],
    [60, 95],
    [68, 130]
  ]) === 5
);

assert(
  circusTower([
    [1, 10],
    [2, 9],
    [3, 7],
    [6, 6],
    [8, 9]
  ]) === 2
);

console.log("All assertions passed.");
