/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *                                           *
 *   Copyright (C) 2021  AmazingMech2418     *
 *                                           *
 *   Licensed under GPLv3 - see license in   *
 *            the LICENSE file               *
 *********************************************/

const fs = require("fs");
const path = require("path");

function getCharList() {
  const pathToFile = path.join(__dirname + "/../resources/CHARS.txt");

  return fs.readFileSync(pathToFile).toString().split("\r").join("").split("\n");
}

module.exports = getCharList;
