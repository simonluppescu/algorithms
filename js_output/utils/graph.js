class Graph {
    constructor(root) {
        this.edges = {};
        this.root = root;
    }
    addAdjacent(origin, newAdjacent, edge = null) {
        let dest = null;
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
    }
    includes(value) {
        const includesHelper = (node) => {
            if (node.value === value)
                return true;
            node.visit();
            let result = false;
            node.adjacents.forEach((adjacent) => {
                if (!adjacent.visited) {
                    result = result || includesHelper(adjacent);
                }
            });
            return result;
        };
        return includesHelper(this.root);
    }
    static generateForDijkstra() {
        const tokyo = new GraphNode("Tokyo");
        const seoul = new GraphNode("Seoul");
        const bangkok = new GraphNode("Bangkok");
        const moscow = new GraphNode("Moscow");
        const nepal = new GraphNode("Nepal");
        const g = new Graph(tokyo);
        g.addAdjacent(tokyo, seoul, 10);
        g.addAdjacent(tokyo, bangkok, 15);
        g.addAdjacent(bangkok, seoul, 20);
        g.addAdjacent(seoul, moscow, 30);
        g.addAdjacent(nepal, moscow, 25);
        g.addAdjacent(nepal, bangkok, 20);
        return g;
    }
}
export default Graph;
export class GraphNode {
    constructor(value) {
        this.value = value;
        this.adjacents = [];
        this.visited = false;
    }
    visit() {
        this.visited = true;
    }
}
