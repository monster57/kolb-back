"use strict";

var fs        = require("fs");
var path      = require("path");
var _         = require("lodash");
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "db.js");
  })
  .forEach(function(file) {
    var model = file.split('.')[0]

    db[_.capitalize(model)] = require('./'+model);
  });

module.exports = db;