const fs = require("fs");
const path = require("path");

const array = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((el) => el.replace(/ /g, ""));
let chooses = {
  X: {
    enemies: { A: 3, B: 0, C: 6 },
    score: 1,
  },
  Y: {
    enemies: { A: 6, B: 3, C: 0 },
    score: 2,
  },
  Z: {
    enemies: { A: 0, B: 6, C: 3 },
    score: 3,
  },
};

let total = 0;

for (const match of array) {
  const elf = match[0];
  const me = match[1];
  const { score, enemies } = chooses[me];
  total += score + enemies[elf];
}

console.log(`Parte 1: ${total}`);

total = 0;
chooses = {
  X: {
    enemies: { A: 3, B: 1, C: 2 },
    score: 0,
  },
  Y: {
    enemies: { A: 1, B: 2, C: 3 },
    score: 3,
  },
  Z: {
    enemies: { A: 2, B: 3, C: 1 },
    score: 6,
  },
};

for (const match of array) {
  const elf = match[0];
  const me = match[1];
  const { score, enemies } = chooses[me];
  total += score + enemies[elf];
}

console.log(`Parte 2: ${total}`);
