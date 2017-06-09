const fs = require('fs');
const path = require('path');
const express = require('express');
const basename = path.basename(__filename);


const Helpers = {};


// Object to hold registered helpers
Helpers.registered = {};


// Register a single helper or
// a module
Helpers.register = function(key, fn) {
  if (typeof key === 'object') {

    // Iterate through keys
    let helpers = key;
    for (let key in helpers) {

      // Register helper function
      let fn = helpers[key];
      this.registered[key] = fn;
    }
  } else {

    // Register a single helper
    // function
    this.registered[key] = fn;
  }
};


// Register all helper files
const files = fs.readdirSync(__dirname);
files.forEach((filename) => {

  // If the file is not this file
  if (filename !== basename) {

    // Require it and register its
    // helpers
    let helperModule = require(`./${ filename }`);
    Helpers.register(helperModule);
  }
});




module.exports = Helpers;





















