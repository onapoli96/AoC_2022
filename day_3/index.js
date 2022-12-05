const fs = require("fs");
const path = require("path");

const array = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((el) => el.replace(/ /g, ""));

let total = 0;

const calcCharValue = (char) => {
  const stringa = char;
  const index = stringa.indexOf(char);
  let to_sum = 0;

  if (stringa.charCodeAt(index) >= 65 && stringa.charCodeAt(index) < 91) {
    to_sum = stringa.charCodeAt(index) - 38;
  } else if (
    stringa.charCodeAt(index) >= 97 &&
    stringa.charCodeAt(index) < 123
  ) {
    to_sum = stringa.charCodeAt(index) - 96;
  }
  return to_sum;
};

for (const el of array) {
  const middleIndex = Math.ceil(el.length / 2);
  const firstHalf = el.substring(0, middleIndex);
  const secondHalf = el.substring(middleIndex, el.length);

  for (const char of firstHalf) {
    if (secondHalf.includes(char)) {
      total += calcCharValue(char);
      break;
    }
  }
}

console.log(`Prima parte: ${total}`);

total = 0;

for (let i = 0; i < array.length; i += 3) {
  for (const char of array[i]) {
    if (array[i + 1].includes(char) && array[i + 2].includes(char)) {
      total += calcCharValue(char);
      break;
    }
  }
}

console.log(`Seconda parte: ${total}`);
