/**
 * Category: GRAPHS
 * Tags: recursion depth_first_search
 *
 * Each year, the government releases a list of the 10000 most common baby names
 * and their frequencies (the number of babies wi t h that name). The only problem with this is
 * that some names have multiple spellings. For example, "John" and "Jon" are
 * essentially the same name but would be listed separately in the list.
 * Given two lists, one of names/frequencies and the other of pairs of equivalent
 * names, write an algorithm to print a new list of the true frequency of each
 * name. Note that if John and Jon are synonyms, and Jon and Johnny are synonyms,
 * then John and Johnny are synonyms. (It is both transitive and symmetric.) In
 * the final list, any name can be used as the "real" name.
 */
class NameNode {
    name;
    count;
    visited;
    neighbors;
    constructor(name, count) {
        this.name = name;
        this.count = count;
        this.visited = false;
        this.neighbors = [];
    }
    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }
    getCount() {
        return this.count;
    }
    getNeighbors() {
        return this.neighbors;
    }
    setVisited() {
        this.visited = true;
    }
    isVisited() {
        return this.visited;
    }
}
class BabyNames {
    nameMapper;
    constructor() {
        this.nameMapper = new Map();
    }
    initMapper(names, synonyms) {
        names.forEach((nameData) => {
            this.nameMapper.set(nameData.name, new NameNode(nameData.name, nameData.count));
        });
        synonyms.forEach((synonym) => {
            const [first, second] = synonym;
            this.nameMapper.get(first).addNeighbor(this.nameMapper.get(second));
            this.nameMapper.get(second).addNeighbor(this.nameMapper.get(first));
        });
    }
    output() {
        const output = [];
        for (let name of this.nameMapper.keys()) {
            const count = this.outputHelper(this.nameMapper.get(name));
            if (count > 0) {
                const data = { name, count };
                output.push(data);
            }
        }
        return output;
    }
    outputHelper(node) {
        if (node.isVisited())
            return 0;
        let count = node.getCount();
        node.setVisited();
        for (const neighbor of node.getNeighbors()) {
            count += this.outputHelper(neighbor);
        }
        return count;
    }
}
const baby = new BabyNames();
baby.initMapper([
    { name: "john", count: 29 },
    { name: "johnny", count: 12 },
    { name: "jon", count: 23 },
    { name: "chris", count: 12 },
    { name: "alexa", count: 15 },
    { name: "kris", count: 9 },
    { name: "jonathan", count: 6 },
    { name: "chrissy", count: 19 },
    { name: "alex", count: 10 }
], [
    ["john", "johnny"],
    ["johnny", "jon"],
    ["chris", "kris"],
    ["alex", "alexa"],
    ["chrissy", "kris"],
    ["jon", "jonathan"]
]);
/*
Should be
[
  { name: 'john', count: 70 },
  { name: 'chris', count: 40 },
  { name: 'alexa', count: 25 }
]
*/
console.log(baby.output());
