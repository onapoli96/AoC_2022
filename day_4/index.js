const fs = require("fs");
const path = require("path");

const array = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((el) => el.replace(/ /g, ""));

let included = 0;
let overlapped = 0;

for (const el of array) {
  const firstElf = el
    .split(",")[0]
    .split("-")
    .map((num) => +num);
  const secondElf = el
    .split(",")[1]
    .split("-")
    .map((num) => +num);

  const isFirstIncluded =
    firstElf[0] >= secondElf[0] &&
    firstElf[0] <= secondElf[1] &&
    firstElf[1] >= secondElf[0] &&
    firstElf[1] <= secondElf[1];

  const isSecondIncluded =
    secondElf[0] >= firstElf[0] &&
    secondElf[0] <= firstElf[1] &&
    secondElf[1] >= firstElf[0] &&
    secondElf[1] <= firstElf[1];

  if (isFirstIncluded || isSecondIncluded) included++;

  const isFirstOverlapped =
    (firstElf[0] >= secondElf[0] && firstElf[0] <= secondElf[1]) ||
    (firstElf[1] >= secondElf[0] && firstElf[1] <= secondElf[1]);

  const isSecondOverlapped =
    (secondElf[0] >= firstElf[0] && secondElf[0] <= firstElf[1]) ||
    (secondElf[1] >= firstElf[0] && secondElf[1] <= firstElf[1]);

  if (isFirstOverlapped || isSecondOverlapped) overlapped++;
}

console.log(overlapped);
