const m = require('./sorting-and-disorder.js');

function testQuicksort(arr) {
  m.quicksort(arr);
  console.log(arr);
}

console.log('quicksort');
testQuicksort([]);
testQuicksort([80]);
testQuicksort([40, 100, 1, 5, 25, 10]);
testQuicksort([40, 100, 1, 5, 25, 10, 10]);
testQuicksort([40, 100, 1, 5, 25, 10, -11, -13, -9000, 300, 200, 500, 25, 5, 1]);
testQuicksort([1, 2, 11, 10]);
testQuicksort([1, 2, 11, 10, 10]);


function testHeapsort(arr) {
  m.heapsort(arr);
  console.log(arr);
}

console.log('heapsort');
testHeapsort([]);
testHeapsort([80]);
testHeapsort([40, 100, 1, 5, 25, 10]);
testHeapsort([40, 100, 1, 5, 25, 10, 10]);
testHeapsort([40, 100, 1, 5, 25, 10, -11, -13, -9000, 300, 200, 500, 25, 5, 1]);
testHeapsort([1, 2, 11, 10]);
testHeapsort([1, 2, 11, 10, 10]);

console.log('inversions');
console.log(m.inversions([])); // 0
console.log(m.inversions([80])); // 0
console.log(m.inversions([1, 2])); // 0
console.log(m.inversions([2, 1])); // 1
console.log(m.inversions([1, 3, 2])); // 1
console.log(m.inversions([3, 2, 1])); // 3
console.log(m.inversions([3, 2, 1, 4])); // 3
console.log(m.inversions([44, 33, 2, 1])); // 6
console.log(m.inversions([1, 5, 7, 99, 1000, 10, 20, 30, 40])); // 8
console.log(m.inversions([1, 5, 7, 1000, 99, 10, 20, 30, 40])); // 9

console.log('lis');
console.log(m.lis([])); // 0
console.log(m.lis([3])); // 1
console.log(m.lis([4, 2])); // 1
console.log(m.lis([2, 4])); // 2
console.log(m.lis([2, 6, 1, 2, 3])); // 3
console.log(m.lis([2, 6, 1, 2, 8, 9])); // 4
console.log(m.lis([1, 7, 8, 2, 9, 3, 4, 5])); // 5
console.log(m.lis([1, 2, 3, 5, 8, 4, 5, 6])); // 6
console.log(m.lis([1, 2, 3, 5, 8, 4, 5, 6, 10, 9, 10])); // 8
console.log(m.lis([1, 2, 2, 3, 3, 5, 8, 4, 4, 5, 6, 10, 9, 10, 4, 10])); // 8

function testQuicksort2(arr, sorter) {
  const swaps = sorter(arr);
  console.log(arr);
  console.log(swaps);
}

function tests(sorter) {
  testQuicksort2([], sorter);
  testQuicksort2([80], sorter);
  testQuicksort2([40, 100, 1, 5, 25, 10], sorter);
  testQuicksort2([40, 100, 1, 5, 25, 10, 10], sorter);
  testQuicksort2([40, 100, 1, 5, 25, 10, -11, -13, -9000, 300, 200, 500, 25, 5, 1], sorter);
  testQuicksort2([1, 2, 11, 10], sorter);
  testQuicksort2([1, 2, 11, 10, 10], sorter);
}

console.log('Lomuto tests');
tests(m.quicksortLomuto);
console.log('Hoare tests');
tests(m.quicksortHoare);

// tests on large arrays
// randomize from StackOverflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomArray(length) {
  const array = [...Array(length).keys()];
  shuffleArray(array);
  return array;
}

console.log('large arrays');
const randomArrays = [10000, 20000, 30000, 40000].map(randomArray);
randomArrays.forEach(array => {
  const copy = array.slice();
  console.log('lomuto time: ' + m.quicksortLomuto(array));
  console.log('hoare time: ' + m.quicksortHoare(copy));
});

