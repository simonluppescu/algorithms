/**
 * Category: ARRAYS
 * Tags: recursion trees matrices real_world
 *
 * You have an integer matrix representing a plot and, where the value at that location
 * represents the height above sea level. A value of zero indicates water. A pond
 * is a region of water connected vertically, horizontally, or diagonally. The size
 * of the pond is the total number of connected water cells. Write a method to compute
 * the sizes of all ponds in the matrix.
 */

import assertArrayEquals from "./utils/assertArray.js";

const visited: { [coord: string]: boolean } = {};
const key = (i: number, j: number) => `${i}:${j}`;

function pondSizes(area: Array<Array<number>>): Array<number> {
  const sizes: Array<number> = [];

  for (let i = 0; i < area.length; i++) {
    for (let j = 0; j < area[i].length; j++) {
      if (area[i][j] === 0 && !visited[key(i, j)]) {
        sizes.push(searchPond(area, i, j));
      }
    }
  }

  return sizes;
}

function searchPond(area: Array<Array<number>>, i: number, j: number): number {
  visited[key(i, j)] = true;

  let size = 1;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue;

      if (area[i + x]?.[j + y] !== undefined) {
        if (area[i + x][j + y] === 0 && !visited[key(i + x, j + y)]) {
          visited[key(i + x, j + y)] = true;
          size += searchPond(area, i + x, j + y);
        }
      }
    }
  }

  return size;
}

// prettier-ignore
const pond = [
  [0, 2, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 1],
  [0, 1, 0, 1]
];

assertArrayEquals(pondSizes(pond), [2, 4, 1]);
