var mongoose = require('mongoose');
var upload = new mongoose.Schema({
    name: {
        type: String
    },

    mimeType: {
        type: String
    },

    data: {
        type: String
    }

},{ timestamps: true });
var Upload = module.exports = mongoose.model('UploadFile', upload);
