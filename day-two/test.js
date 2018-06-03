const m = require('./dynamic-programming.js');


console.log('max value path');
console.log(m.maxValuePath([
  [0, 4, 5],
  [6, 100, 30],
  [7, 20, 0]
])); // 136


console.log('longest common subsequence');
console.log(m.LCS('hollow'.split(''), 'hello'.split('')));


console.log('golomb sequence');
console.log(m.golomb(3)); // 2
console.log(m.golomb(11)); // 5
console.log(m.golomb(8)); // 4


console.log('fair split');
console.log(m.fairSplit([3, 2, 8, 1]));
console.log(m.fairSplit([3, 2, 20, 8, 7]));
console.log(m.fairSplit([3, 2, 22, 8, 7]));
console.log(m.fairSplit([3, 2, 8, 7, 17]));


console.log('best strategy');
console.log(m.bestStrategy([3, 9, 2, 1])); // player 1: [1, 9], player 2: [3, 2]
console.log(m.bestStrategy([3, 4, 9, 4, 1])); // player 1: [3, 4, 4], player 2: [1, 9]
console.log(m.bestStrategy([3, 4, 9, 5, 1])); // player 1: [3, 4, 5], player 2: [1, 9]
console.log(m.bestStrategy([3, 4, 9, 6, 1])); // either player 1: [3, 4, 6], player 2: [1, 9] or [3, 9, 1], player 2: [4, 6]
console.log(m.bestStrategy([3, 4, 9, 7, 1])); // player 1: [3, 9, 1], player 2: [4, 7]
console.log(m.bestStrategy([3, 4, 9, 8, 1])); // player 1: [3, 9, 1], player 2: [4, 8]


console.log('directed acyclic graph');

const {graph, initial} = new m.DirAcyclic(3);

const second = graph.createNode(7);
graph.addLink(initial, second);
const third = graph.createNode(8);
graph.addLink(second, third);
graph.addLink(initial, third);
const fourth = graph.createNode(12);
graph.addLink(third, fourth);

console.log(graph.distance(initial, fourth)); // 2
console.log(graph.distance(second, fourth)); // 2
console.log(graph.distance(second, third)); // 1


