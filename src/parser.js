/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *                                           *
 *   Copyright (C) 2021  AmazingMech2418     *
 *                                           *
 *   Licensed under GPLv3 - see license in   *
 *            the LICENSE file               *
 *********************************************/

const lexer = require("./lexer.js");

function Parser(_items, _chars) {
  const items = _items;
  const chars = _chars;
  let labelsField = {};
  let numsField = [];
  let macros = {}

  function parseMacros() {
    for(let j = 0; j < items.length; j++) {
      let i = items[j];
      if(i.startsWith("MACRO:")) {
        i = i.replace("MACRO:", "").trim();

        const macroName = i.substring(0, i.indexOf(" ")).toLowerCase();
        const macroCode = i.substring(i.indexOf(" "));

        const macroTokens = lexer(macroCode);

        macros[macroName] = macroTokens;

        items.splice(j, 1);
      }
    }

    for(let i = 0; i < items.length; i++) {
      if(items[i].toLowerCase() in macros) {
        const macroTokens = macros[items[i].toLowerCase()];

        items.splice(i, 1, ...macroTokens);

        i += macroTokens.length - 1;
      }
    }
  }

  this.parse = function () {
    parseMacros();

    const fns = require("./functions.js");

    // Stores binary numbers
    let nums = [];
    // Stores positions of various labels
    const labels = {};

    // Loop 1000 times to ensure proper label positions - to be optimized later
    for(let k = 0; k < 1000; k++) {
      // Reset nums
      nums = [];
      // At position 1
      let pos = 1;
      // Loop through items
      for(let i of items) {
        if(i.toLowerCase() in fns) {
          // If a function, get the binary for the corresponding number
          const bin = fns[i.toLowerCase()].toString("2");
          nums.push("0".repeat(8-bin.length)+bin);
          // 1 byte
          pos += 8;
        } else if (i.startsWith(":")) {
          // Set label position
          labels[i] = pos;
        } else if (i.toUpperCase().startsWith("LABEL:")) {
          // Get label
          const lblName = i.replace(/LABEL/i, "");
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

    labelsField = labels;
    numsField = nums;
  }

  this.getLabels = function () {
    return labelsField;
  }

  this.getBin = function () {
    return numsField;
  }
}

module.exports = Parser;
