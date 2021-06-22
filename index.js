/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *                                           *
 *   Copyright (C) 2021  AmazingMech2418     *
 *                                           *
 *   Licensed under GPLv3 - see license in   *
 *            the LICENSE file               *
 *********************************************/

module.exports = (argv) => {

  // Numerical codes to go with each function name
  const fns = require("./src/functions.js");

  // fs is needed to read chars and the main program file
  const fs = require("fs");

  // Read program file
  const readProgFile = require("./src/progfile.js");
  const prog = readProgFile("main.sfth");

  // Get chars with \r removed and delimited by newlines
  const getCharList = require("./src/charlist.js");
  const chars = getCharList();

  // Array to store tokens from program file
  const items = require("./src/lexer.js")(prog);


  const Parser = require("./src/parser.js");
  const parser = new Parser(items, chars);
  parser.parse();

  // Stores binary numbers
  const nums = parser.getBin();
  // Stores positions of various labels
  const labels = parser.getLabels();



  // Print labels for debugging purposes
  console.log(labels);
  // Print output binary
  console.log(nums.join(""));

}
