class Graph {
  edges: { [val: number]: { [val2: number]: number } };
  root: GraphNode;

  constructor(root: GraphNode) {
    this.edges = {};
    this.root = root;
  }
}

class GraphNode {
  adjacents: GraphNode[];
  visited: boolean;
  value: number;

  constructor(value: number) {
    this.value = value;
    this.adjacents = [];
    this.visited = false;
  }

  addAdjacent(newAdjacent: number | GraphNode): void {
    if (typeof newAdjacent === "number") {
      this.adjacents.push(new GraphNode(newAdjacent));
    } else if (newAdjacent instanceof GraphNode) {
      this.adjacents.push(newAdjacent);
    }
  }

  static generateForDijkstra(): GraphNode {
    // hi
  }
}
