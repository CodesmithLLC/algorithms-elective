# Problems in Dynamic Programming
*Also known as problems with coins!*

## Maximum Value Path

You are given a square 2-dimensional grid of coin values (i.e. an array of arrays). Starting from the upper left corner, you must make your way down to the bottom right corner. On each move, you can only move down or to the right (you may never move up or left). You get to collect the coin at each square in the grid you step on. Your function should return the maximum amount of money you can collect by travelling from the upper left corner to the bottom right corner.

### Extension

Additionally, your function should return a string representing one of the paths through the coinGrid that earns you the most money (e.g. the string 'DRRRDD' would mean, starting from the upper left corner, move Down, then Right three times, then Down twice).

## Longest Common Subsequence (LCS)

Compute the length of the Longest Common Subsequence of two arrays of integers. Refer to lecture slides for guidance.

### Extension

Additionally, return one of the subsequences that is an LCS of `x` and `y`.

## Golomb Suequence

The [Golomb Sequence](https://en.wikipedia.org/wiki/Golomb_sequence) is a special sequence of integers. It is defined as such:

1. The Golomb Sequence is non-decreasing
1. The first number in the sequence is 1.
1. The second number in the sequence is 2.
1. The n<sup>th</sup> number in the sequence describes how many times the number n appears in the sequence.

The Golomb sequence begins: `1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, ...`.

## Fair Split

You are given an array of coin values. You must divide the coins amongst your two children. They will throw a severe tantrum unless they receive the fairest split possible (i.e the sum of child 1's coins is as close as possible to the sum of child 2's coins).

Your function should return an array containing two arrays. The first array is child 1's coins and the second array is child 2's coins.

### Extension

Refactor your function so that it receives an array of coins and the number of children you have. Divide the coins in the fairest possible manner amongst all your children.

## Best Strategy

Your are given an array of (*guess what?*) coins! You are playing a game against a single opponent. You and your opponent alternate turns. On each turn a player may remove one coin from either the beginning of the array or the end of the array and keep the coin. You move first. What is the minimum value of coins you will collect if you play optimally?

## Extension Problem: Directed Graphs and Shortest Paths

First, design a [Directed Graph data structure](https://en.wikipedia.org/wiki/Directed_graph). You may implement this however you desire.

Then, design a function to determine the shortest point between two nodes in a directed graph. To begin with, you may assume that your graphs are [acyclic](https://en.wikipedia.org/wiki/Directed_acyclic_graph). Then extend your function so that it handles directed graphs that may contain cycles.
