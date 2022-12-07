const fs = require("fs");
const path = require("path");

const array = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

const input = { stacks: [], moves: [] };

let key = "stacks";
for (const element of array) {
  if (element === "") {
    key = "moves";
    continue;
  }
  input[key].push(element);
}

const columns = input.stacks.pop().replace(/ /g, "");

const buildStacks = () => {
  const stacks = {};
  for (const column of columns) {
    stacks[column] = [];
  }

  for (let i = 0; i <= columns[columns.length - 1]; i++) {
    for (const row of input.stacks) {
      if (row[i * 4 + 1] && row[i * 4 + 1] !== " ") {
        stacks[i + 1].push(row[i * 4 + 1]);
      }
    }
  }
  return stacks;
};

const buildResponse = (stacks, revert) => {
  for (const move of input.moves) {
    const to_move = move.match(/^move *(\d+)/);
    const from = move.match(/from *(\d+)/);
    const elements_to_add = stacks[from[1]].splice(0, to_move[1]);
    if (revert) elements_to_add.reverse();
    const to = move.match(/to *(\d+)/);
    stacks[to[1]] = [...elements_to_add, ...stacks[to[1]]];
  }

  let response = "";

  for (const key in stacks) response += stacks[key][0];
  return response;
};

let stacks = buildStacks();
const response_1 = buildResponse(stacks, true);

stacks = buildStacks();
const response_2 = buildResponse(stacks, false);

console.log("Parte 1", response_1);
console.log("Parte 2", response_2);
