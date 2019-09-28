class BinaryTree {
  root: BinaryTreeNode;

  constructor(root = new BinaryTreeNode("foo", null, null)) {
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
  value: string | number;
  left: BinaryTreeNode;
  right: BinaryTreeNode;

  constructor(value: string | number, left: BinaryTreeNode, right: BinaryTreeNode) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default BinaryTree;
