import { assert } from "console";
class Line {
    constructor(slope, intercept) {
        this.slope = slope;
        this.intercept = intercept;
    }
    toString() {
        return `y = ${this.slope}x + ${this.intercept}`;
    }
}
function bestLine(points) {
    const lineCounts = {};
    let maxCount = 0;
    let bestLine;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const line = getLine(points[i], points[j]);
            if (lineCounts[line.toString()] === undefined) {
                lineCounts[line.toString()] = 0;
            }
            lineCounts[line.toString()] += 1;
            if (lineCounts[line.toString()] > maxCount) {
                maxCount = lineCounts[line.toString()];
                bestLine = line;
            }
        }
    }
    return bestLine;
}
function getLine(one, two) {
    const slope = (one.y - two.y) / (one.x - two.x);
    const intercept = one.y - slope * one.x;
    return new Line(slope, intercept);
}
assert(bestLine([
    { x: 1, y: 3 },
    { x: 2, y: 2 },
    { x: 3, y: 0 },
    { x: 0, y: 2 },
    { x: 10, y: 10 },
    { x: 1, y: 0 },
    { x: 3, y: 3 },
    { x: 5, y: 5 },
    { x: 0, y: 3 },
    { x: 0, y: 1 }
]).toString() === "y = 1x + 0");
console.log("All assertions passed");
