const fs = require("fs");

function getCharList() {
  return fs.readFileSync("./resources/CHARS.txt").toString().split("\r").join("").split("\n");
}

module.exports = getCharList;
