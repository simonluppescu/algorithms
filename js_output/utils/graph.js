var Graph = /** @class */ (function () {
    function Graph(root) {
        this.edges = {};
        this.root = root;
    }
    return Graph;
}());
var GraphNode = /** @class */ (function () {
    function GraphNode(value) {
        this.value = value;
        this.adjacents = [];
        this.visited = false;
    }
    GraphNode.prototype.addAdjacent = function (newAdjacent) {
        if (typeof newAdjacent === "number") {
            this.adjacents.push(new GraphNode(newAdjacent));
        }
        else if (newAdjacent instanceof GraphNode) {
            this.adjacents.push(newAdjacent);
        }
    };
    GraphNode.generateForDijkstra = function () {
        // hi
    };
    return GraphNode;
}());
