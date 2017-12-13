var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile_number: {
        type: Number,
        required: true,
        unique: true
    },

    company_name: {
        type: String
    },

    website_url: {
        type: String
    },

    designation: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    is_email_verified: {
        type: Boolean,
        default: false
    },

    is_mobile_verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        select: false
    },
    email_otp: {
        type: String,
        select: false
    },
    token: {
        type: String,
        select: false
    }

}, {
    timestamps: true
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.comparePassword = function(candidatePassword, hash) {
    return bcrypt.compareSync(candidatePassword, hash);
}


module.exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
