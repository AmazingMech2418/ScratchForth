/*********************************************
 *   ScratchForth - Forth implementation for *
 *          Scratch Binary Format            *
 *                                           *
 *   Copyright (C) 2021  AmazingMech2418     *
 *                                           *
 *   Licensed under GPLv3 - see license in   *
 *            the LICENSE file               *
 *********************************************/

function lexer(prog) {
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
  
  return items;
}

module.exports = lexer;
