import { mergeSort } from "./merge-sort.js"

let randomArray1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let randomArray2 = [1,5,7,8,12,43,66,888, 888]
let randomArray3 = [50,30,70,20,40,60,80,32,65,75,85,32,34,36]

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
                return null
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
                    return node.right
                } else if(node.right === null) {
                    return node.left
                } //else if(node.left !== null && node.right !== null) {
                    //console.log(node.right)
                    //findSmallest(node.right)
                //}
            }
        }
        deleteNode(value, node)

        /*function findSmallest(node) {
            if(node.left !== null)
                findSmallest(node)
            console.log(node.data)
            return node.data
        }*/
    }    
}

let test = new Tree()
test.buildTree(randomArray3)
test.insert(62)
test.delete(32)
test.prettyPrint()