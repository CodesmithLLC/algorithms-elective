// Quick Sort

function quicksort(arr, lo, hi) {

}

function partition(arr, lo, hi) {

}

// Heap Sort
// Some potentially helpful functions are provided below
const getLeftChildInd = index => (2 * index) + 1
const getRightChildInd = index => (2 * index) + 2
const getParentInd = index => Math.floor((index - 1) / 2)
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function siftUp(arr, endOfHeap){

}

function buildMaxHeap(arr) {

}

function siftDown(arr, endOfHeap){

}

function heapsort(arr) {

}

// Inversions

function inversions(arr) {
  
}

// Longest Increasing Subsequence

function lis(seq) {

}

// Quick Sort Extensions
// (please complete heap sort and disorder first)

function createSort(partition) {
  return function quicksort(arr, lo, hi) {

  }
}

function lomutoPartion() {

}

function hoarePartition() {

}

const quicksortLomuto = createSort(lomutoPartion);
const quicksortHoare= createSort(hoarePartition);
