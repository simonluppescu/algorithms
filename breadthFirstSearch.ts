/**
 * Category: GRAPHS
 * Tags: algorithms search queues
 *
 * Breadth First Search of a graph. Keeps track of visited nodes.
 */
import Graph, { GraphNode } from "./utils/graph";
import Queue from "./utils/queue";
import * as assert from "assert";

class BSTSearcher {
  graph: Graph;

  constructor(g: Graph) {
    this.graph = g;
  }

  includes(value: string): boolean {
    const queue = new Queue<GraphNode>();

    queue.enqueue(this.graph.root);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      node.visit();
      if (node.value === value) return true;

      node.adjacents.forEach((adjacent) => {
        if (adjacent.visited) return;

        queue.enqueue(adjacent);
      });
    }

    return false;
  }
}

const searcher = new BSTSearcher(Graph.generateForDijkstra());

assert(searcher.includes("Tokyo") === true);
assert(searcher.includes("Nepal") === true);
assert(searcher.includes("Seattle") === false);
console.log("All assertions passed.");
