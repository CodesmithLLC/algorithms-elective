// memoize

function memoize(func) {
	const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
		
		if (!cache.hasOwnProperty(key))
			cache[key] = func.apply(null, args);
    
    return cache[key];
  }
}

// Maximum Value Path
function maxValuePath(grid) {
  function total(i, j) {
    const prev = [];
    if (i > 0)
      prev.push(totalMem(i - 1, j));
    if (j > 0)
      prev.push(totalMem(i, j - 1));
    
    return grid[i][j] + (prev.length ? Math.max.apply(null, prev) : 0);
  }
  
  const totalMem = memoize(total);
  return totalMem(grid.length - 1, grid[0].length - 1);
}

exports.maxValuePath = maxValuePath;

// Longest Common Subsequence

function LCS(array1, array2) {
  function lcs(i, j) {
    if (array1[i] === array2[j]) {
      return 1 + (i > 0 && j > 0 ? lcsMem(i - 1, j - 1) : 0);
    }
    else {
      const prev = [];
      if (i > 0)
        prev.push(lcsMem(i - 1, j));
      if (j > 0)
        prev.push(lcsMem(i, j - 1));
      
      return prev.length ? Math.max.apply(null, prev) : 0;
    }
  }
  
  const lcsMem = memoize(lcs);
  return lcsMem(array1.length - 1, array2.length - 1);
}

exports.LCS = LCS;

// Golomb Sequence

const golomb = (function() {
  function seq(n) {
    if (n === 1)
      return 1;
    
    return 1 + seqMem(n - seqMem(seqMem(n - 1)));
  }
  
  const seqMem = memoize(seq);
  
  return seqMem;
})();

exports.golomb = golomb;

// Fair Split

function fairSplit(coins) {
  // let {x_0, ..., x_N} be the array of coins
  // returns the subset if a subset of {x_0, ..., x_j} sums to i and false otherwise
  function subsetSum(i, j) {
    if (j === -1)
      return i === 0;
    
    const subsetPrev = subsetSumMem(i, j - 1);
    if (subsetPrev)
      return subsetPrev;
    
    const differencePrev = subsetSumMem(i - coins[j], j - 1);
    if (differencePrev)
      return {index: j, prev: differencePrev};
    
    return false;
  }
  
  const subsetSumMem = memoize(subsetSum);
  
  let sum = Math.floor(coins.reduce((a, b) => a + b) / 2);
  while (true) {
    let results = subsetSumMem(sum, coins.length - 1);
    if (results) {
      // unravel results into set
      const resultsSet = new Set();
      while (results !== true) {
        resultsSet.add(results.index);
        results = results.prev;
      }
      
      // produce arrays for player 1 and player 2
      const player1 = [];
      const player2 = [];
      for (let i = 0; i < coins.length; i++) {
        if (resultsSet.has(i))
          player1.push(coins[i]);
        else
          player2.push(coins[i]);
      }
      
      return {player1, player2};
    }
    
    sum--;
  }
}

exports.fairSplit = fairSplit;

// Best Strategy

function bestStrategy(coins) {
  // keep track of left index and right index
  function score(left, right, remainingCoins) {
    if (left === right) {
      return remainingCoins;
    }
    
    // the opponent's score when we choose left/right
    const oppScoreLeft = scoreMem(left + 1, right, remainingCoins - coins[left]);
    const oppScoreRight = scoreMem(left, right - 1, remainingCoins - coins[right]);
    
    if (oppScoreLeft > oppScoreRight) {
      // we choose the right side
      return remainingCoins - oppScoreRight;
    }
    else {
      // we choose the left side
      return remainingCoins - oppScoreLeft;
    }
  }
  
  const scoreMem = memoize(score);
  const totalCoins = coins.reduce((a, b) => a + b);
  
  return scoreMem(0, coins.length - 1, totalCoins);
}

exports.bestStrategy = bestStrategy;

// Extension: Shortest Path in DAG
// (first create a Directed Graph data structure)

/*
Directed acylic graph: our graph is designed to:
1. Be connected
2. Not have any cycles
3. only have links one way


We've made a great effort to keep node value/child information private.
This was achieved using weak maps.
*/
const DirAcyclic = (function() {
	// private variables maintained using weak maps
	const nodeVars = new WeakMap();
	const dagHeads = new WeakMap();
	
	function Node(graph, value) {
		nodeVars.set(this, {graph, value, children: new Set()});
	}
	
	Node.prototype.getVal = function() {
		return nodeVars.get(this).value;
	};
	
	Node.prototype.setVal = function(value) {
		nodeVars.get(this).value = value;
	};
	
	Node.prototype.getGraph = function() {
		return nodeVars.get(this).graph;
	}
	
	function DirAcyclic(value) {
		// overarching invisible parent node
		const head = new Node(this, null);
		dagHeads.set(this, head);
		
		// first node of the graph
		const initial = new Node(this, value);
		nodeVars.get(head).children.add(initial);
		
		return {graph: this, initial};
	}
	
	// create a node associated with a graph, but not on the graph
	// if the node loses scope, the node will be garbage collected
	DirAcyclic.prototype.createNode = function(value) {
		return new Node(this, value);
	}
	
	// minimum unidirectional distance from node1 to node2
	// returns 0 if they are the same node, and -1 if node2 is unreachable from node1
	DirAcyclic.prototype.distance = function(node1, node2) {
		// we keep track of whether the nodes are painted along the way
		// distance from node to node2. calculated using breadth-first search
		const nodeList = [{node: node1, distance: 0}];
		let i = 0;
		let result = -1;
		
		while (i < nodeList.length) {
			const curr = nodeList[i];
			
			// are we there yet?
			if (curr.node === node2) {
				result = curr.distance;
				break;
			}
			
			// look at children
			const children = nodeVars.get(curr.node).children;
			for (const child of children) {
				if (!nodeVars.get(child).painted) {
					nodeList.push({node: child, distance: curr.distance + 1});
					nodeVars.get(child).painted = true;
				}
			}
			
			i++;
		}
		
		// clean up
		for (const element of nodeList)
			delete nodeVars.get(element.node).painted;
		
		return result;
	}
	
	// create a link from node1 to node2 in the graph
	// 
	// Do nothing if it's impossible. This means that:
	// node1 and node2 must be associated with the graph "this"
	// Either node1 or node2 must be already in the graph (reachable from head)
	// node2 cannot already point to node1 (node1 cannot be reachable from node2)
	DirAcyclic.prototype.addLink = function(node1, node2) {
		// node1 and node2 must be associated with the graph "this"
		if (node1.getGraph() !== this || node2.getGraph() !== this) return;
		
		// node2 cannot already point to node1 (node1 cannot be reachable from node2)
		if (this.distance(node2, node1) !== -1) return;
		
		// Either node1 or node2 must be already in the graph (reachable from head)
		const head = dagHeads.get(this);
		if (this.distance(head, node1) !== -1) {
			// node that if node1 already directly points to node2 that nothing happens, because children are stored as a Set
			nodeVars.get(node1).children.add(node2);
		}
		else if (this.distance(head, node2) !== -1) {
			nodeVars.get(head).children.add(node1);
			nodeVars.get(node1).children.add(node2);
		}
	}
	
	return DirAcyclic;
})();

exports.DirAcyclic = DirAcyclic;
