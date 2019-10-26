"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = require("./utils/graph");
var queue_1 = require("./utils/queue");
var assert = require("assert");
var BSTSearcher = /** @class */ (function () {
    function BSTSearcher(g) {
        this.graph = g;
    }
    BSTSearcher.prototype.includes = function (value) {
        var queue = new queue_1.default();
        queue.enqueue(this.graph.root);
        while (!queue.isEmpty()) {
            var node = queue.dequeue();
            node.visit();
            if (node.value === value)
                return true;
            node.adjacents.forEach(function (adjacent) {
                if (adjacent.visited)
                    return;
                queue.enqueue(adjacent);
            });
        }
        return false;
    };
    return BSTSearcher;
}());
var searcher = new BSTSearcher(graph_1.default.generateForDijkstra());
assert(searcher.includes("Tokyo") === true);
assert(searcher.includes("Nepal") === true);
assert(searcher.includes("Seattle") === false);
console.log("All assertions passed.");
