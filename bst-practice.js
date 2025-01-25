//for practice purpose, not the actual code for Odin

//basic binary search tree
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

function sortedArrToBSTRecur(arr, start, end) {
    if(start > end)
        return null

    let mid = start + Math.floor((end - start) / 2)
    let root = new Node(arr[mid])
    root.left = sortedArrToBSTRecur(arr, start, mid - 1)
    root.right = sortedArrToBSTRecur(arr, mid + 1, end)

    return root
}

function sortedArrToBST(arr) {
    return sortedArrToBSTRecur(arr, 0, arr.length - 1)
}

function preOrder(root) {
    if(root === null)
        return

    console.log(root.data)
    preOrder(root.left)
    preOrder(root.right)
}

const arr = [1,2,3,4,5,6,7]
const root = sortedArrToBST(arr)
preOrder(root)

//balanced binary search tree
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

class balancedBST {
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = this.root;
        if(node === null) {
            this.root = new Node(data);
        } else {
            const searchTree = function(node) {
                if(data < node.data) {
                    if(node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if(node.left !== null)
                        return searchTree(node.left);

                } else if(data > node.data) {
                    if(node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if(node.right !== null)
                        return searchTree(node.right);
                } else
                    return null;
            };
            return searchTree(node);
        }
    }

    findMin() {
        let current = this.root;
        while(current.left !== null)
            current = current.left;
        return current.data;
    }

    findMax() {
        let current = this.root;
        while(current.right !== null)
            current = current.right;
        return current.data;
    }

    isPresent(data) {
        let current = this.root;
        while(current.data !== data) {
            if(data < current.left)
                current = current.left;
            else
                current = current.right;
        }
        console.log(current)
    }

    remove(data) {
        const removeNode = function(node, data) {
            if(node === null)
                return null;

            if (data === node.data){
                //node has no children
                if(node.left == null && node.right == null)
                    return null;

                //node has no left child
                else if(node.left == null)
                    return node.right;

                //node has no right child
                else if(node.right == null)
                    return node.left;

                //node has two children, left and right
                let tempNode = node.right;
                while(tempNode.left !== null)
                    tempNode = tempNode.left;
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data)

            } else if(data < node.data) {
                node.left = removeNode(node.left, data)
                return node
            } else {
                node.right = removeNode(node.right, data)
                return node
            }
        }
        this.root = removeNode(this.root, data)
    }
}

let test = new balancedBST()
test.add(3)
test.add(2)
test.add(5)

test.remove(2)
console.log(test)