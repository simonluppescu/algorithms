"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category: GRAPHS
 * Tags: recursion sets maps
 *
 * Use Topological Sort to get the build order based on packages and their dependencies. Assume there are no cycles in dependencies.
 */
var assertArray_1 = require("./utils/assertArray");
var BuildOrder = /** @class */ (function () {
    function BuildOrder(packs) {
        this.packages = packs;
        this.visited = new Set();
    }
    BuildOrder.prototype.build = function () {
        var e_1, _a;
        var buildOrder = new Array();
        try {
            for (var _b = __values(this.packages.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var packageName = _c.value;
                if (this.visited.has(packageName))
                    continue;
                this.search(packageName, buildOrder);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return buildOrder;
    };
    BuildOrder.prototype.search = function (packageName, buildOrder) {
        var _this = this;
        this.packages.get(packageName).forEach(function (dependency) {
            if (!_this.visited.has(dependency)) {
                _this.search(dependency, buildOrder);
            }
        });
        this.visited.add(packageName);
        buildOrder.push(packageName);
    };
    return BuildOrder;
}());
var packages = new Map();
packages.set("1", ["0"]);
packages.set("3", ["1", "2"]);
packages.set("2", ["1", "0"]);
packages.set("4", ["3", "2"]);
packages.set("0", []);
var bo = new BuildOrder(packages);
assertArray_1.default(bo.build(), ["0", "1", "2", "3", "4"]);
var packages2 = new Map();
packages2
    .set("2", ["0"])
    .set("1", ["0"])
    .set("3", ["1", "2"])
    .set("4", ["2", "3"])
    .set("0", []);
var bo2 = new BuildOrder(packages2);
assertArray_1.default(bo2.build(), ["0", "2", "1", "3", "4"]);
