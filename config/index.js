var path = require('path');
var _ = require('lodash');
var dbConfigs = require('./database.json');
var env = process.env.NODE_ENV || 'development';
var config = {};
var arr = Object.keys(dbConfigs);
config.db = dbConfigs[env.trim()];
config.env = env;


module.exports = config;