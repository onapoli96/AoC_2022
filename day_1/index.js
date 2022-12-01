const fs = require("fs");
const path = require("path");

const array = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

let current = 0;
const sums = [];
for (let [i, el] of array.entries()) {
  current += +el;
  if (!el || i === array.length - 1) {
    sums.push(current);
    current = 0;
  }
}

const top_tre = sums.sort((a, b) => b - a).splice(0, 3);
const max = top_tre[0];
const somma = top_tre.reduce((a, b) => a + b);

console.log(max, somma);
