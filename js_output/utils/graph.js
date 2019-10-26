"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = /** @class */ (function () {
    function Graph(root) {
        this.edges = {};
        this.root = root;
    }
    Graph.prototype.addAdjacent = function (origin, newAdjacent, edge) {
        if (edge === void 0) { edge = null; }
        var dest = null;
        if (newAdjacent instanceof GraphNode) {
            dest = newAdjacent;
        }
        else {
            dest = new GraphNode(newAdjacent);
        }
        origin.adjacents.push(dest);
        dest.adjacents.push(origin);
        if (!edge) {
            this.edges[origin.value][dest.value] = edge;
        }
    };
    Graph.prototype.includes = function (value) {
        var includesHelper = function (node) {
            if (node.value === value)
                return true;
            node.visit();
            var result = false;
            node.adjacents.forEach(function (adjacent) {
                if (!adjacent.visited) {
                    result = result || includesHelper(adjacent);
                }
            });
            return result;
        };
        return includesHelper(this.root);
    };
    Graph.generateForDijkstra = function () {
        var tokyo = new GraphNode("Tokyo");
        var seoul = new GraphNode("Seoul");
        var bangkok = new GraphNode("Bangkok");
        var moscow = new GraphNode("Moscow");
        var nepal = new GraphNode("Nepal");
        var g = new Graph(tokyo);
        g.addAdjacent(tokyo, seoul, 10);
        g.addAdjacent(tokyo, bangkok, 15);
        g.addAdjacent(bangkok, seoul, 20);
        g.addAdjacent(seoul, moscow, 30);
        g.addAdjacent(nepal, moscow, 25);
        g.addAdjacent(nepal, bangkok, 20);
        return g;
    };
    return Graph;
}());
exports.default = Graph;
var GraphNode = /** @class */ (function () {
    function GraphNode(value) {
        this.value = value;
        this.adjacents = [];
        this.visited = false;
    }
    GraphNode.prototype.visit = function () {
        this.visited = true;
    };
    return GraphNode;
}());
exports.GraphNode = GraphNode;
