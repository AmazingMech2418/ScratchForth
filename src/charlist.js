const fs = require("fs");
const path = require("path");

function getCharList() {
  const pathToFile = path.join(__dirname + "/../resources/CHARS.txt");

  return fs.readFileSync(pathToFile).toString().split("\r").join("").split("\n");
}

module.exports = getCharList;
