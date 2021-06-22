/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *********************************************/

// Numerical codes to go with each function name
const fns = {
  // 1 reserved for pushs
  "dup": 2,
  "swap": 3,
  "over": 4,
  "drop": 5,
  "rot": 6,
  "setvar": 7,
  "getvar": 8,
  "move": 9,
  "turnr": 10,
  "turnl": 11,
  "gotoobj": 12,
  "gotoxy": 13,
  "glidetoobj": 14,
  "glidetoxy": 15,
  "setdir": 16,
  "pointto": 17,
  "dx": 18,
  "setx": 19,
  "dy": 20,
  "sety": 21,
  "bounce": 22,
  "rotstyle": 23,
  "getx": 24,
  "gety": 25,
  "getdir": 26,
  "sayfor": 27,
  "say": 28,
  "goto": 29,
  "thinkfor": 30,
  "think": 31,
  // 32 reserved for pushc
  "switchcostume": 33,
  "nextcosume": 34,
  "switchbackdrop": 35,
  "nextbackdrop": 36,
  "changesize": 37,
  "setsize": 38,
  "changefx": 39,
  "setfx": 40,
  "clearfx": 41,
  "show": 42,
  "hide": 43,
  "gotofront": 44,
  "gotoback": 45,
  "goforward": 46,
  "goback": 47,
  "costumenum": 48,
  "costumename": 49,
  "backdropnum": 50,
  "backdropname": 51,
  "getsize": 52,
  "playwait": 53,
  "play": 54,
  "stopsounds": 55,
  "gotoif": 56,
  "call": 57,
  "ret": 58,
  "callif": 59,
  "changepitch": 60,
  "changepan": 61,
  "setpitch": 62,
  "setpan": 63,
  "clearsfx": 64,
  "changevol": 65,
  "setvol": 66,
  "getvol": 67,
  "wait": 68,
  // 69 reserved for possible waituntil
  "stop": 70,
  "clone": 71,
  "delclone": 72,
  "touching": 73,
  "touchingclr": 74,
  "clrtouchingclr": 75,
  "dist": 76,
  "ask": 77,
  "answer": 78,
  "key": 79,
  "mousedown": 80,
  "mousex": 81,
  "mousey": 82,
  "dragmode": 83,
  "loudness": 84,
  "timer": 85,
  "resettimer": 86,
  // 87 reserved for possible <> of <>
  "current": 88,
  "since2000": 89,
  "uname": 90,
  "+": 91,
  "-": 92,
  "*": 93,
  "/": 94,
  "rand": 95,
  ">": 96,
  "<": 97,
  "=": 98,
  "and": 99,
  "or": 100,
  "not": 101,
  "join": 102,
  "letterof": 103,
  "len": 104,
  "mod": 105,
  "round": 106,
  "abs": 107,
  "floor": 108,
  "ceiling": 109,
  "sqrt": 110,
  "sin": 111,
  "cos": 112,
  "tan": 113,
  "asin": 114,
  "acos": 115,
  "atan": 116,
  "ln": 117,
  "log": 118,
  "exp": 119,
  "exp10": 120,
  "warp": 121,
  "nowarp": 122,
  "drum": 123,
  "rest": 124,
  "note": 125,
  "instrument": 126,
  "settempo": 127,
  "changetempo": 128,
  "gettempo": 129,
  "clearpen": 130,
  "stamp": 131,
  "pendown": 132,
  "penup": 133,
  "penclr": 134,
  "changepenfx": 135,
  "setpenfx": 136,
  "changepensize": 137,
  "setpensize": 138,
  "viddata": 139,
  "setvid": 140,
  "vidtransparency": 141,
  "speak": 142,
  "voice": 143,
  "setlang": 144,
  "translate": 145,
  "getlang": 146
};

// fs is needed to read chars and the main program file
const fs = require("fs");

// Read program file
// Convert newlines to spaces, removing empty lines
const prog = fs.readFileSync("main.sfth").toString().split("\n").filter(n=>n.length>0).join(" ");
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
