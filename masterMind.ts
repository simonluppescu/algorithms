/**
 * Category: ARRAYS
 * Tags: real_world algorithms
 *
 * Given a Master Mind board where you have Red, Green, Yellow, Blue marbles,
 * check how many HITS and PSEUDO hits a guess has. A hit is when the color and
 * position are correct, and a pseudo is when the color is right but in a different
 * position.
 */
import assertArrayEquals from "./utils/assertArray.js";

class MasterMind {
  private solution: Array<string>;
  private colorCounts: { [color: string]: number };

  constructor(solution: string) {
    this.solution = solution.split("");
    this.colorCounts = {};
    this.solution.forEach((color) => {
      if (this.colorCounts[color] === undefined) this.colorCounts[color] = 0;

      this.colorCounts[color] += 1;
    });
  }

  isCorrect(guess: string): [number, number] {
    const colorCountsCopy = { ...this.colorCounts };
    const guessArr = guess.split("");

    let [hits, pseudo] = [0, 0];
    // Need to get HITS first because they are most important
    for (let i = 0; i < guessArr.length; i++) {
      const currColor = guessArr[i];
      if (currColor === this.solution[i]) {
        if (colorCountsCopy[currColor] > 0) {
          hits++;
          colorCountsCopy[currColor] -= 1;
        }
      }
    }
    // Now we can get pseudo hits
    for (let i = 0; i < guessArr.length; i++) {
      const currColor = guessArr[i];
      if (currColor !== this.solution[i] && colorCountsCopy[currColor] > 0) {
        pseudo++;
        colorCountsCopy[currColor] -= 1;
      }
    }

    return [hits, pseudo];
  }
}

const hi = new MasterMind("RGBY");
assertArrayEquals(hi.isCorrect("GGRR"), [1, 1]);
assertArrayEquals(hi.isCorrect("GGGR"), [1, 1]);
assertArrayEquals(hi.isCorrect("RGYB"), [2, 2]);
assertArrayEquals(hi.isCorrect("GGGG"), [1, 0]);

const ho = new MasterMind("GGGG");
assertArrayEquals(ho.isCorrect("RGBY"), [1, 0]);
assertArrayEquals(ho.isCorrect("RRRR"), [0, 0]);
assertArrayEquals(ho.isCorrect("GGGG"), [4, 0]);
