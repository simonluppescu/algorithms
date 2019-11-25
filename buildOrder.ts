/**
 * Category: GRAPHS
 * Tags: recursion sets maps
 *
 * Use Topological Sort to get the build order based on packages and their dependencies. Assume there are no cycles in dependencies.
 */
import assertArray from "./utils/assertArray";

class BuildOrder {
  packages: Map<string, Array<string>>;
  visited: Set<string>;

  constructor(packs: Map<string, Array<string>>) {
    this.packages = packs;
    this.visited = new Set<string>();
  }

  build(): Array<string> {
    const buildOrder = new Array<string>();

    for (const packageName of this.packages.keys()) {
      if (this.visited.has(packageName)) continue;

      this.search(packageName, buildOrder);
    }

    return buildOrder;
  }

  search(packageName: string, buildOrder: Array<string>): void {
    this.packages.get(packageName).forEach((dependency) => {
      if (!this.visited.has(dependency)) {
        this.search(dependency, buildOrder);
      }
    });

    this.visited.add(packageName);
    buildOrder.push(packageName);
  }
}

const packages = new Map<string, Array<string>>();
packages.set("1", ["0"]);
packages.set("3", ["1", "2"]);
packages.set("2", ["1", "0"]);
packages.set("4", ["3", "2"]);
packages.set("0", []);
const bo = new BuildOrder(packages);
assertArray(bo.build(), ["0", "1", "2", "3", "4"]);

const packages2 = new Map<string, Array<string>>();
packages2
  .set("2", ["0"])
  .set("1", ["0"])
  .set("3", ["1", "2"])
  .set("4", ["2", "3"])
  .set("0", []);
const bo2 = new BuildOrder(packages2);
assertArray(bo2.build(), ["0", "2", "1", "3", "4"]);
