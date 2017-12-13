
var mongoose = require('mongoose');
var config = require('../config');

var promise = require('bluebird');
mongoose.connect(config.db.url);
mongoose.Promise = promise;
module.exports = mongoose;