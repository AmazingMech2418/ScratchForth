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

function readProgFile(file = "main.sfth") {
  // Read program file
  // Convert newlines to spaces, removing empty lines
  const prog = fs.readFileSync(file).toString().split("\n").filter(n=>n.length>0).join(" ");
  
  return prog;
}

module.exports = readProgFile;
