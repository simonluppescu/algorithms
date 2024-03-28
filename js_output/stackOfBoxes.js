/**
 * Category: RECURSION
 * Tags: math
 *
 * Given a list of boxes, stack the boxes to get a maximum height where the box
 * below must be greater in height, width, and depth.
 * Return that max height.
 */
import { assert } from "console";
class Stacker {
    stack(boxes) {
        return this.stackHelper(boxes, null);
    }
    stackHelper(remainingBoxes, prevBox) {
        if (remainingBoxes.length === 1) {
            const lastBox = remainingBoxes[0];
            if (this.canStack(lastBox, prevBox)) {
                return lastBox.height;
            }
            else {
                return 0;
            }
        }
        let finalHeight = 0;
        remainingBoxes.forEach((box, index) => {
            if (this.canStack(box, prevBox)) {
                const tmpBoxes = remainingBoxes.slice();
                tmpBoxes.splice(index, 1);
                const result = box.height + this.stackHelper(tmpBoxes, box);
                if (result > finalHeight)
                    finalHeight = result;
            }
        });
        return finalHeight;
    }
    canStack(queried, prevBox) {
        if (prevBox === null)
            return true;
        return (queried.width < prevBox.width &&
            queried.depth < prevBox.depth &&
            queried.height < prevBox.height);
    }
}
const stacker = new Stacker();
const boxes = [
    { width: 3, depth: 5, height: 3 },
    { width: 5, depth: 5, height: 4 },
    { width: 1, depth: 2, height: 1 },
];
assert(stacker.stack(boxes) === 5);
console.log("All assertions passed.");
