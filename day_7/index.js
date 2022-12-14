const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

const file_system = {};
const actual_path = [];

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

for (const row of input) {
  const elements = row.split(" ");
  if (elements[0] === "$" && elements[1] === "cd") {
    if (elements[2] === "..") actual_path.pop();
    else actual_path.push(elements[2]);
    const key = actual_path.join("-");
    if (!file_system[key]) file_system[key] = 0;
  } else if (isNumber(+elements[0])) {
    const key = actual_path.join("-");
    file_system[key] += +elements[0];
  }
}

for (const key in file_system) {
  for (const key2 in file_system) {
    if (key2.startsWith(key) && key2 !== key) {
      file_system[key] += file_system[key2];
    }
  }
}

for (const key in file_system) {
  if (file_system[key] < 100000) total += file_system[key];
}

console.log(total);
