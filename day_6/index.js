const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

const hasUniqueChars = (string) => {
  const chars = {};
  for (const char of string) {
    if (!chars[char]) chars[char] = true;
    else return false;
  }
  return true;
};

for (let i = 4; i < input.length; i++) {
  const window = input.substring(i - 4, i);
  if (hasUniqueChars(window)) {
    console.log(i);
    return;
  }
}
