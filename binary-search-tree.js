import { mergeSort } from "./merge-sort.js"

let randomArray1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let randomArray2 = [50,30,70,20,40,60,80]
let randomArray3 = []

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(arr) {
        let sortedArray = mergeSort(arr); //sort the array
        let cleanedArray = this.removeDuplicate(sortedArray); //remove the duplicate array
        return this.arrToBSTRecur(cleanedArray, 0, cleanedArray.length - 1); 
    }

    removeDuplicate(arr) {
        for(let i=0; i < arr.length; i++)
            if(arr[i] == arr[i + 1]) {
                arr.splice(i,1);
                i -= 1;
            }
        return arr;
    }

    arrToBSTRecur(arr, start, end) {
        if(start > end)
            return null;
    
        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);
        root.left = this.arrToBSTRecur(arr, start, mid - 1);
        root.right = this.arrToBSTRecur(arr, mid + 1, end);
    
        this.root = root;
        return this.root;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
     

    insert(value) {
        const node = this.root;
        function recursion(node) {
            if(value < node.data) {
                if(node.left === null) {
                    node.left = new Node(value);
                    return;
                }
                else if(node.left !== null) {
                    recursion(node.left);
                }
            } else if(value > node.data) {
                if(node.right === null) {
                    node.right = new Node(value);
                    return;
                } else if(node.right !== null) {
                    recursion(node.right)
                }
            } else if(value === node.data) {
                return;
            }
        }
        recursion(node)
    }

    delete(value) {
        let node = this.root;

        function deleteNode(value, node) {
            if(node === null) {
                return null;
            }

            if(value < node.data) {
                node.left = deleteNode(value, node.left);
                return node;
            } else if(value > node.data) {
                node.right = deleteNode(value, node.right);
                return node;
            } else if(value === node.data) {
                if(node.left === null && node.right === null) {
                    return null;
                } else if(node.left === null) {
                    return node.right;
                } else if(node.right === null) {
                    return node.left;
                } else if(node.left !== null && node.right !== null) {
                    let tempNode = node.right;
                    while(tempNode.left !== null) {
                        tempNode = tempNode.left;
                    }
                    deleteNode(tempNode.data, node.right);
                    node.data = tempNode.data;
                    return node;
                }
            }
        }
        deleteNode(value, node)
    }

    find(value) {
        let node = this.root;
        while(node !== null) {
            if(value > node.data)
                node = node.right;
            else if(value < node.data)
                node = node.left;
            else if(value === node.data) {
                this.prettyPrint(node)
                return node
            }
        }
        console.log('not found')
    }

    levelOrder() {
        let levelOrderArray = []
        let queue = []
        if(this.root !== null) {
            queue.push(this.root);
            while(queue.length > 0) {
                let node = queue.shift();
                levelOrderArray.push(node.data);
                if(node.left !==  null)
                    queue.push(node.left)
                if(node.right !== null)
                    queue.push(node.right)
                }
            return levelOrderArray;
        } else
            return null;
    }

    inOrder() {
        if(this.root === null)
            return null;
        else {
            let inOrderArray = [];
            function traverseInOrder(node) {
                if(node.left !== null)
                    traverseInOrder(node.left);
                inOrderArray.push(node.data);
                if(node.right !== null)
                    traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return inOrderArray;
        }
    }

    preOrder() {
        if(this.root === null)
            return null;
        else {
            let preOrderArray = [];
            function traversePreOrder(node) {
                preOrderArray.push(node.data);
                if(node.left !== null)
                    traversePreOrder(node.left);
                if(node.right !== null)
                    traversePreOrder(node.right);
            }
            traversePreOrder(this.root);
            return preOrderArray;
        }
    }

    postOrder() {
        if(this.root === null)
            return null;
        else {
            let postOrderArray = [];
            function traversePostOrder(node) {
                if(node.left !== null)
                    traversePostOrder(node.left);
                if(node.right !== null)
                    traversePostOrder(node.right);
                postOrderArray.push(node.data);
            }
            traversePostOrder(this.root);
            return postOrderArray;
        }
    }

    minHeight(node = this.root) {
        if(node == null)
            return -1;

        if(typeof node === 'number') {
            node = this.find(node)
        }

        let left = this.minHeight(node.left)
        let right = this.minHeight(node.right)
        //console.log("node: " + node.data + " ,left: " + left + " ,right: " + right);

        if(left < right)
            return left + 1;
        else
            return right + 1;
    };

    height(node = this.root) {
        if(node == null)
            return -1;

        let left = this.height(node.left)
        let right = this.height(node.right)
        //console.log("node: " + node.data + " ,left: " + left + " ,right: " + right);

        if(left > right)
            return left + 1;
        else
            return right + 1;
    };

    depth(value) {
        let node = this.root;
        let count = 0;
        while(node !== null) {
            if(value > node.data) {
                node = node.right;
                count += 1
            } else if(value < node.data) {
                node = node.left;
                count += 1
            }                
            else if(value === node.data) {
                return count;
            }
        }
        return 'not found'
    }

    isBalanced() {
        let minHeight = this.minHeight();
        let maxHeight = this.height();
        if(minHeight >= maxHeight - 1)
            return true;
        else
            return false;
    }

    rebalance() {
        let newArray = this.inOrder();
        return this.arrToBSTRecur(newArray, 0, newArray.length - 1)
    }
}

let test = new Tree()
test.buildTree(randomArray1)
test.insert(27)
//test.delete(50)
//console.log(test.find(4))
test.prettyPrint()
console.log(test.minHeight())
console.log(test.height())
console.log(test.depth(23))
console.log(test.isBalanced())
test.rebalance()
test.prettyPrint()
//console.log(test.levelOrder())
//console.log(test.inOrder())
//console.log(test.preOrder())
//console.log(test.postOrder())