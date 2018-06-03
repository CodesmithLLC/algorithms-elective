// Quick Sort

function quicksort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi)
    return;
  
  const pivot = partition(arr, lo, hi);
  
  quicksort(arr, lo, pivot - 1);
  quicksort(arr, pivot + 1, hi);
}

function partition(arr, lo, hi) {
  // pivot will be at the end, that is, at hi
  let i = lo, j = hi - 1;
  
  // pre-swap array elements to prepare pivot entry
  while (i <= j) {
    while (arr[i] < arr[hi]) {
      i++;
    }
    while (arr[j] > arr[hi]) {
      j--;
    }
    
    // swap to proceed forward
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  
  // enter pivot into array
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

exports.quicksort = quicksort;

// Heap Sort
// Some potentially helpful functions are provided below
const getLeftChildInd = (index, endofHeap) => {
  const results = (2 * index) + 1;
  return results <= endofHeap ? results : null;
};
const getRightChildInd = (index, endofHeap) => {
  const results = (2 * index) + 2;
  return results <= endofHeap ? results : null;
};
const getParentInd = index => Math.floor((index - 1) / 2)
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function siftUp(arr, endOfHeap) {
  let i = endOfHeap, j;
  
  while (j = getParentInd(i), j >= 0 && arr[i] > arr[j]) {
    swap(arr, j, i);
    i = j;
  }
}

function buildMaxHeap(arr) {
  for (let i = 1; i < arr.length; i++)
    siftUp(arr, i);
}

function siftDown(arr, endOfHeap) {
  let i = 0, l, r;
  
  while (l = getLeftChildInd(i, endOfHeap), r = getRightChildInd(i, endOfHeap), l !== null && (arr[i] < arr[l] || arr[i] < arr[r])) {
    const j = arr[r] > arr[l] ? r : l;
    swap(arr, j, i);
    i = j;
  }
}

function heapsort(arr) {
  buildMaxHeap(arr);
  
  let i = arr.length - 1;
  while (i > 0) {
    swap(arr, 0, i);
    i--;
    siftDown(arr, i);
  }
}

exports.heapsort = heapsort;

// Inversions

function inversions(arr) {
  return sortAndCount(arr).count;
}

function sortAndCount(arr) {
  if (arr.length <= 1)
    return {arr, count: 0};
  
  const midpoint = arr.length / 2;
  const left = sortAndCount(arr.slice(0, midpoint));
  const right = sortAndCount(arr.slice(midpoint));
  
  return mergeAndCount(left, right);
}

function mergeAndCount(left, right) {
  let count = 0, i = 0, j = 0;
  let arr = [];
  
  while (i < left.arr.length && j < right.arr.length) {
    if (left.arr[i] <= right.arr[j]) {
      arr.push(left.arr[i]);
      i++;
    }
    else {
      arr.push(right.arr[j]);
      count += left.arr.length - i;
      j++;
    }
  }
  
  if (i < left.arr.length)
    arr = arr.concat(left.arr.slice(i));
  else
    arr = arr.concat(right.arr.slice(j));
  
  return {arr, count: count + left.count + right.count};
}

exports.inversions = inversions;

// Longest Increasing Subsequence
// Returns the longest increasing (not nondecreasing!) subsequence.

// binary search. returns the index of the sequence ending with the greatest value that's strictly less than val
// if we get an exact value match, return undefined
function binarySearch(seqEndings, val) {
  let start = 0, end = seqEndings.length - 1;
  while (start < end) {
    const mid = Math.ceil((start + end) / 2);
    
    if (seqEndings[mid] === val)
      return;
    else if (seqEndings[mid] < val)
      start = mid;
    else
      end = mid - 1;
  }
  
  return start;
}

// O(N log(N)) algorithm
function lis(array) {
  // array of best sequence endings for every given length
  const seqEndings = [null];
  
  array.forEach((val, i) => { // iterating over array
    // binary search through sequence endings
    const index = binarySearch(seqEndings, val);
    
    // if exact val match, then skip over.
    if (index === undefined)
      return;
    // otherwise, override next index.
    seqEndings[index + 1] = val;
  });
  
  return seqEndings.length - 1;
}

exports.lis = lis;

// Quick Sort Extensions
// (please complete heap sort and disorder first)

function createSort(partition) {
  return function quicksort(arr, lo = 0, hi = arr.length - 1) {
    if (lo >= hi)
      return 0;
    
    const {pivot, swaps} = partition(arr, lo, hi);
    
    const leftSwaps = quicksort(arr, lo, pivot - 1);
    const rightSwaps = quicksort(arr, pivot + 1, hi);
    
    return swaps + leftSwaps + rightSwaps;
  }
}

function lomutoPartition(arr, lo, hi) {
  // pivot will be at the end, that is, at hi
  let i = lo - 1;
  let swaps = 0;
  
  // pre-swap array elements to prepare pivot entry
  for (let j = lo; j < hi; j++) {
    if (arr[j] < arr[hi]) {
      // increment and swap
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swaps++;
    }
  }
  
  // enter pivot into array
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return {pivot: i + 1, swaps: swaps + 1};
}

function hoarePartition(arr, lo, hi) {
  // pivot will be at the end, that is, at hi
  let i = lo, j = hi - 1;
  let swaps = 0;
  
  // pre-swap array elements to prepare pivot entry
  while (i <= j) {
    while (arr[i] < arr[hi]) {
      i++;
    }
    while (arr[j] > arr[hi]) {
      j--;
    }
    
    // swap to proceed forward
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swaps++;
      i++;
      j--;
    }
  }
  
  // enter pivot into array
  if (i !== hi) {
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    swaps++;
  }
  return {pivot: i, swaps};
}

const quicksortLomuto = createSort(lomutoPartition);
const quicksortHoare = createSort(hoarePartition);

exports.quicksortLomuto = quicksortLomuto;
exports.quicksortHoare = quicksortHoare;

