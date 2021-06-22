/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *********************************************/

// Numerical codes to go with each function name
const fns = require("./src/functions.js");

// fs is needed to read chars and the main program file
const fs = require("fs");

// Read program file
const readProgFile = require("./src/progfile.js");
const prog = readProgFile("main.sfth");

// Get chars with \r removed and delimited by newlines
const chars = fs.readFileSync("CHARS.txt").toString().split("\r").join("").split("\n");

// Array to store tokens from program file
let items = [];

// Double quotes
let quote = 0;
// Single quotes
let quote2 = 0;
// Variable to store current token
let current = "";
// Boolean to tell if in the middle of escaping a character
let cont = false;

// Loop through chars of program file
for(let i of prog) {
  if(quote == 0 && quote2 == 0 && i == " ") {
    // If no quotes and there is a space

    // Increment if there is something to increment
    if(current.length > 0)
      items.push(current);

    // Reset current
    current = "";
  } else {
    // No space or in quotes

    if(cont) {
      // If escaping, just add the character
      current += i;
    } else if(i == "\\") {
      // If "\", escape next character
      cont = true;
    } else if(i == '"' && quote2 == 0) {
      // If double quote

      quote = 1 - quote;
      // Double quote is for strings
      if(quote == 1) current = "STR:";
    } else if(i == "'" && quote == 0) {
      // If single quote

      quote2 = 1 - quote2;
      // Single quote is for chars
      if(quote2 == 1) current = "CHR:";
    } else {
      // Add char
      current += i;
    }
  }
}
// Push last item
items.push(current);

// Filter empty items
items = items.filter(n=>n.length>0);

// Stores binary numbers
let nums = [];
// Stores positions of various labels
const labels = {};

// Loop 1000 times to ensure proper label positions - to be optimized later
for(let k = 0; k < 1000; k++) {
  // Reset nums
  nums = [];
  // At position 1
  pos = 1;
  // Loop through items
  for(let i of items) {
    if(i in fns) {
      // If a function, get the binary for the corresponding number
      const bin = fns[i].toString("2");
      nums.push("0".repeat(8-bin.length)+bin);
      // 1 byte
      pos += 8;
    } else if (i.startsWith(":")) {
      // Set label position
      labels[i] = pos;
    } else if (i.startsWith("LABEL:")) {
      // Get label
      const lblName = i.replace("LABEL", "");
      nums.push("00000001");
      // Start is 1 byte
      pos += 8;
      for(let j of (labels[lblName] || 1).toString()) {
        const num = chars.indexOf(j) + 1;
        const bin = num.toString("2");
        nums.push("0".repeat(8-bin.length)+bin);

        // Each digit is 1 byte
        pos += 8;
      }
      nums.push("00000000");
      // End is 1 byte
      pos += 8;
    } else if (i.startsWith("CHR:")) {
      // pushc - pushing a character

      i = i.replace("CHR:", "");
      const num = 32;
      const bin = num.toString("2");
      nums.push("0".repeat(8-bin.length)+bin);
      const num2 = chars.indexOf(i) + 1;
      const bin2 = num2.toString("2");
      nums.push("0".repeat(8-bin2.length)+bin2);
      // 2 bytes - 1 for instruction and 1 for char
      pos += 16;
    } else {
      // pushs - pushing a string


      i = i.replace("STR:", "");
      nums.push("00000001");
      // Start is 1 byte
      pos += 8;
      for(let j of i) {
        const num = chars.indexOf(j) + 1;
        const bin = num.toString("2");
        nums.push("0".repeat(8-bin.length)+bin);
        // Each char is 1 byte
        pos += 8;
      }
      nums.push("00000000");
      // End is 1 byte
      pos += 8;
    }
  }
}

// Print labels for debugging purposes
console.log(labels);
// Print output binary
console.log(nums.join(""));
