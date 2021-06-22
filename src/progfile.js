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

function readProgFile(file = "main.sfth", shouldJoin = true) {
  // Read program file
  // Convert newlines to spaces, removing empty lines
  const prog = fs.readFileSync(file).toString().split("\n").filter(n =>
    n.length > 0 && !n.startsWith("#"));

  for(let i = 0; i < prog.length; i++) {
    if(prog[i].startsWith("$")) {
      const compilerInstructions = require("./compilerinstructions.js");

      let newStuff = compilerInstructions(prog[i].slice(1).trim(), prog, file);
      prog.splice(i, 1, ...newStuff);
    }
  }

  return shouldJoin?prog.join(" "):prog;
}

module.exports = readProgFile;
