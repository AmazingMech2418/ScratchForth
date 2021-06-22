const fs = require("fs");

function readProgFile(file = "main.sfth") {
  // Read program file
  // Convert newlines to spaces, removing empty lines
  const prog = fs.readFileSync(file).toString().split("\n").filter(n=>n.length>0).join(" ");
  
  return prog;
}

module.exports = readProgFile;
