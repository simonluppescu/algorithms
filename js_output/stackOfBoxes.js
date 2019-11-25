"use strict";
/**
 * Category: RECURSION
 * Tags: math
 *
 * Given a list of boxes, stack the boxes to get a maximum height where the box below must be greater in height, width, and depth.
 * Return that max height.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Stacker = /** @class */ (function () {
    function Stacker() {
    }
    Stacker.prototype.stack = function (boxes) {
        return this.stackHelper(boxes, null);
    };
    Stacker.prototype.stackHelper = function (remainingBoxes, prevBox) {
        var _this = this;
        if (remainingBoxes.length === 1) {
            var lastBox = remainingBoxes[0];
            if (this.canStack(lastBox, prevBox)) {
                return lastBox.height;
            }
            else {
                return 0;
            }
        }
        var finalHeight = 0;
        remainingBoxes.forEach(function (box, index) {
            if (_this.canStack(box, prevBox)) {
                var tmpBoxes = remainingBoxes.slice();
                tmpBoxes.splice(index, 1);
                var result = box.height + _this.stackHelper(tmpBoxes, box);
                if (result > finalHeight)
                    finalHeight = result;
            }
        });
        return finalHeight;
    };
    Stacker.prototype.canStack = function (queried, prevBox) {
        if (prevBox === null)
            return true;
        return queried.width < prevBox.width && queried.depth < prevBox.depth && queried.height < prevBox.height;
    };
    return Stacker;
}());
var stacker = new Stacker();
var boxes = [
    { width: 3, depth: 5, height: 3 },
    { width: 5, depth: 5, height: 4 },
    { width: 1, depth: 2, height: 1 }
];
assert(stacker.stack(boxes) === 5);
console.log("All assertions passed.");
