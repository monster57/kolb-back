var mongoose = require('mongoose');
var operation = new mongoose.Schema({
    name: {
        type: String
    }

});
var Operation = module.exports = mongoose.model('Operation', operation);
