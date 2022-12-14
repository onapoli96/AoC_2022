const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

const buildFS = () => {
  const actual_path = [];
  const file_system = {};
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
  return file_system;
};

const firstPart = (file_system) => {
  for (const key in file_system) {
    for (const key2 in file_system) {
      if (key2.startsWith(key) && key2 !== key) {
        file_system[key] += file_system[key2];
      }
    }
  }
  let total = 0;

  for (const key in file_system) {
    if (file_system[key] < 100000) total += file_system[key];
  }
  return total;
};

const secondPart = (file_system) => {
  let total = 0;

  for (const key in file_system) {
    total += file_system[key];
    for (const key2 in file_system) {
      if (key2.startsWith(key) && key2 !== key) {
        file_system[key] += file_system[key2];
      }
    }
  }

  const TOTAL_DISK_SPACE = 70000000;
  const REQUIRED_SPACE = 30000000;
  const AVAIABLE_SPACE = TOTAL_DISK_SPACE - total;

  const dirs = Object.keys(file_system)
    .map((key) => file_system[key])
    .sort((a, b) => a - b);
  for (const dir of dirs) {
    if (AVAIABLE_SPACE + dir >= REQUIRED_SPACE) return dir;
  }
};

console.log(`Parte 1: ${firstPart(buildFS())}`);
console.log(`Parte 2: ${secondPart(buildFS())}`);
