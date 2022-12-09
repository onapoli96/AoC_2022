const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

const hasUniqueChars = (string) => {
  const chars = {};
  for (const char of string) {
    if (chars[char]) return false;
    chars[char] = true;
  }
  return true;
};

const findMarker = (windowSize) => {
  for (let i = windowSize; i < input.length; i++) {
    const window = input.substring(i - windowSize, i);
    if (hasUniqueChars(window)) return i;
  }
};

const response_1 = findMarker(4);
const response_2 = findMarker(14);

console.log(`Parte 1: ${response_1} Parte 2:  ${response_2} `);
