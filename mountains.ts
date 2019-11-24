/**
 * Category: ARRAYS
 * Tags: math visual
 *
 * Given a grid, place the peak of a mountain in particular squares. The mountain height gets lower as you move out
 * so that the height of the land is computed by: `height - abs(row - originalRow) - abs(col - originalCol)`.
 * Given a set of mountain peaks in the grid, compute the average height across all squares.
 */
interface Peak {
  row: number;
  col: number;
  height: number;
}

class Mountains {
  peaks: Peak[];
  numRows: number;
  numCols: number;

  constructor(height: number, width: number) {
    this.peaks = new Array<Peak>();
    this.numRows = height;
    this.numCols = width;
  }

  add(row: number, col: number, height: number): void {
    this.peaks.push({ row, col, height });
  }

  computeAverageHeight(): number {
    let heightSum = 0;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        let height = 0;
        this.peaks.forEach((peak) => {
          const thisHeight = peak.height - Math.abs(peak.row - i) - Math.abs(peak.col - j);
          if (thisHeight > height) height = thisHeight;
        });
        heightSum += height;
      }
    }

    return Math.floor(heightSum / (this.numCols * this.numRows));
  }
}

const mountains = new Mountains(5, 6);
mountains.add(1, 1, 100);
mountains.add(2, 3, 100);
console.log(mountains.computeAverageHeight());
