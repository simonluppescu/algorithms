class BinaryTree {
  root: BinaryTreeNode;

  constructor(root = new BinaryTreeNode(0, null, null)) {
    this.root = root;
  }

  print(): void {
    const printNode = (node: BinaryTreeNode): void => {
      if (node.left) printNode(node.left);
      console.log(node.value);
      if (node.right) printNode(node.right);
    };

    printNode(this.root);
  }

  static randomBST(): BinaryTree {
    const root = new BinaryTreeNode(50, null, null);

    for (let i = 0; i < 25; i++) {
      const value = Math.floor(Math.random() * 100) + 1;
      let currNode = root;

      while (true) {
        if (value < currNode.value) {
          if (!currNode.hasLeft()) {
            currNode.left = new BinaryTreeNode(value, null, null);
            break;
          } else {
            currNode = currNode.left;
          }
        } else if (value >= currNode.value) {
          if (!currNode.hasRight()) {
            currNode.right = new BinaryTreeNode(value, null, null);
            break;
          } else {
            currNode = currNode.right;
          }
        }
      }
    }

    return new BinaryTree(root);
  }

  static generateBST(): BinaryTree {
    const left = new BinaryTreeNode(
      3,
      new BinaryTreeNode(2, new BinaryTreeNode(1, null, null), null),
      new BinaryTreeNode(4, null, null)
    );
    const right = new BinaryTreeNode(8, new BinaryTreeNode(6, null, null), new BinaryTreeNode(9, null, null));

    const node = new BinaryTreeNode(5, left, right);

    return new this(node);
  }

  static generateBT(): BinaryTree {
    const left = new BinaryTreeNode(
      1,
      new BinaryTreeNode(2, new BinaryTreeNode(3, null, null), null),
      new BinaryTreeNode(4, null, null)
    );
    const right = new BinaryTreeNode(5, new BinaryTreeNode(6, null, null), new BinaryTreeNode(7, null, null));

    const node = new BinaryTreeNode(8, left, right);

    return new this(node);
  }
}

export class BinaryTreeNode {
  value: number;
  left: BinaryTreeNode;
  right: BinaryTreeNode;
  isVisited: boolean;

  constructor(value: number, left: BinaryTreeNode, right: BinaryTreeNode) {
    this.value = value;
    this.left = left;
    this.right = right;

    this.isVisited = false;
  }

  hasLeft(): boolean {
    return this.left && !this.left.isVisited;
  }

  hasRight(): boolean {
    return this.right && !this.right.isVisited;
  }

  visit(): void {
    this.isVisited = true;
  }
}

export default BinaryTree;
