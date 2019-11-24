var Mountains = /** @class */ (function () {
    function Mountains(height, width) {
        this.peaks = new Array();
        this.numRows = height;
        this.numCols = width;
    }
    Mountains.prototype.add = function (row, col, height) {
        this.peaks.push({ row: row, col: col, height: height });
    };
    Mountains.prototype.computeAverageHeight = function () {
        var heightSum = 0;
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var height = 0;
                this_1.peaks.forEach(function (peak) {
                    var thisHeight = peak.height - Math.abs(peak.row - i) - Math.abs(peak.col - j);
                    if (thisHeight > height)
                        height = thisHeight;
                });
                heightSum += height;
            };
            for (var j = 0; j < this_1.numCols; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.numRows; i++) {
            _loop_1(i);
        }
        return Math.floor(heightSum / (this.numCols * this.numRows));
    };
    return Mountains;
}());
var mountains = new Mountains(5, 6);
mountains.add(1, 1, 100);
mountains.add(2, 3, 100);
console.log(mountains.computeAverageHeight());
