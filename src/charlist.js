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

function getCharList() {
  return fs.readFileSync("./resources/CHARS.txt").toString().split("\r").join("").split("\n");
}

module.exports = getCharList;
