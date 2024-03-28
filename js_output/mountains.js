class Mountains {
    constructor(height, width) {
        this.peaks = new Array();
        this.numRows = height;
        this.numCols = width;
    }
    add(row, col, height) {
        this.peaks.push({ row, col, height });
    }
    computeAverageHeight() {
        let heightSum = 0;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let height = 0;
                this.peaks.forEach((peak) => {
                    const thisHeight = peak.height - Math.abs(peak.row - i) - Math.abs(peak.col - j);
                    if (thisHeight > height)
                        height = thisHeight;
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
