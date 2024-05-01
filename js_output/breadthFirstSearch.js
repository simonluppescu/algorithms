/**
 * Category: GRAPHS
 * Tags: algorithms search queues
 *
 * Breadth First Search of a graph. Keeps track of visited nodes.
 */
import Graph from "./utils/graph.js";
import Queue from "./utils/queue.js";
import { assert } from "console";
class BSTSearcher {
    graph;
    constructor(g) {
        this.graph = g;
    }
    includes(value) {
        const queue = new Queue();
        queue.enqueue(this.graph.root);
        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            node.visit();
            if (node.value === value)
                return true;
            node.adjacents.forEach((adjacent) => {
                if (adjacent.visited)
                    return;
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
