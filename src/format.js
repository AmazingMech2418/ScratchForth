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

class Formatter {
  constructor(_type) {
    this.type = _type;
    this.formatted = "";
  }

  format(nums) {
    if(this.type == 2) {
      this.formatted = nums.join("");
    } else if (this.type == 3) {
      this.formatted = nums.map(n => parseInt(n, 2));
    }
  }

  out(file) {
    fs.writeFileSync(file, Buffer.from(this.formatted));
  }
}

module.exports = Formatter;
