//merge sort
export function mergeSort(array) {
    if(array.length <=1)
        return array

    let arrayLow = 1;
    let arrayHigh = array.length
    if(arrayLow < arrayHigh) {
        let arrayMid = Math.floor((arrayHigh + arrayLow) / 2)
        let arrayLeft = array.slice(0,arrayMid)
        let arrayRight = array.slice(arrayMid, arrayHigh)
        return merging(mergeSort(arrayLeft), mergeSort(arrayRight))
    }
}

//modified
function merging(arrayLeft, arrayRight) {
    let mergedArray = []
    let i = 0
    let j = 0
    let k = 0
    while(i < arrayLeft.length && j < arrayRight.length) {
        if(arrayLeft[i] < arrayRight[j]) {
            mergedArray[k] = arrayLeft[i]
            i = i + 1
            k = k + 1
        }
        else {
            mergedArray[k] = arrayRight[j]
            j = j + 1
            k = k + 1
        }
    }
    for(let z = i; z < arrayLeft.length; z++ ){
        mergedArray[k] = arrayLeft[i]
        k = k + 1
    }
    for(let z = j; z < arrayRight.length; z++ ){
        mergedArray[k] = arrayRight[z]
        k = k + 1
    }
    return mergedArray
}

//the original two way sort
function twoWaySort(array) {
    let mergedArray = []
    let arrayLow = 1;
    let arrayHigh = array.length
    let arrayMid = Math.floor((arrayHigh + arrayLow) / 2)
    let arrayLeft = array.slice(0,arrayMid)
    let arrayRight = array.slice(arrayMid, arrayHigh)
    let i = 0
    let j = 0
    let k = 0
    while(i < arrayLeft.length && j < arrayRight.length) {
        if(arrayLeft[i] < arrayRight[j]) {
            mergedArray[k] = arrayLeft[i]
            i = i + 1
            k = k + 1
        }
        else {
            mergedArray[k] = arrayRight[j]
            j = j + 1
            k = k + 1
        }
    }
    for(let z = i; z < arrayLeft.length; z++ ){
        mergedArray[k] = arrayLeft[i]
        k = k + 1
    }
    for(let z = j; z < arrayRight.length; z++ ){
        mergedArray[k] = arrayRight[z]
        k = k + 1
    }
    return mergedArray
}