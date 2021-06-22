/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *                                           *
 *   Copyright (C) 2021  AmazingMech2418     *
 *                                           *
 *   Licensed under GPLv3 - see license in   *
 *            the LICENSE file               *
 *********************************************/

function printHelpFile() {
  const fs = require("fs");
  const path = require("path")

  const helpFile = fs.readFileSync(path.join(__dirname + "/resources/help.txt"));

  console.log(helpFile.toString());
}

function printPackageInfo() {
  const fs = require("fs");
  const path = require("path")

  const helpFile = fs.readFileSync(path.join(__dirname + "/resources/packageinfo.txt"));

  console.log(helpFile.toString());
}

module.exports = (argv) => {

  const args = argv.slice(2);

  const opts = {
    labels: false,
    out: 1,
    outfile: "out.txt",
    outfileDef: false,
    infile: "main.sfth"
  };

  if(args.length == 0) {
    printHelpFile();
    return;
  }

  for(let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg == "-l" || arg == "--labels") {
      opts.labels = true;
    } else if (arg == "-o" || arg == "--output") {
      const type = args[++i];
      if (type == "stdout") {
        opts.out = 1;
      } else if (type == "file") {
        opts.out = 2;
      } else if (type == "sbf") {
        opts.out = 3;
        if(!opts.outfileDef) opts.outfile = "out.sbf";
      } else {
        console.log("Error: Invalid format type \"" + type + "\"");
        printHelpFile();
        return;
      }
    } else if (arg == "-f" || arg == "--file") {
      const outfileName = args[++i];
      opts.outfile = outfileName;
      opts.outfileDef = true;
    } else if (arg == "-h" || arg == "--help") {
      printHelpFile();
      return;
    } else if (arg == "--info") {
      printPackageInfo();
      return;
    } else {
      opts.infile = arg;
    }
  }

  // Numerical codes to go with each function name
  const fns = require("./src/functions.js");

  // fs is needed to read chars and the main program file
  const fs = require("fs");

  // Read program file
  const readProgFile = require("./src/progfile.js");
  const prog = readProgFile(opts.infile);

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
  if (opts.labels) console.log(labels);
  // Print output binary

  if(opts.out == 1) {
    console.log(nums.join(""));
  } else {
    const Formatter = require("./src/format.js");
    const formatter = new Formatter(opts.out);
    formatter.format(nums);

    formatter.out(opts.outfile);
  }

}
