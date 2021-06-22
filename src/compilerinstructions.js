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
const readProgFile = require("./progfile.js");
const path = require("path");

function compilerInstructions(line, prog, filename) {
  const first = line.substring(0, line.indexOf(" ")).trim();
  const rest = line.substring(line.indexOf(" ") + 1).trim();

  if(first.toLowerCase() == "include") {
    if(rest.startsWith("<") && rest.endsWith(">")) {
      /*************************************
       *  To be added when SFPM comes out  *
       *************************************/
    } else {
      const dir = path.dirname(filename);
      return readProgFile(path.resolve(dir, rest), false);
    }
  }
  return [];
}

module.exports = compilerInstructions;
