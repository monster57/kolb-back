"use strict";
var ses = require('node-ses'),
    client = ses.createClient({ key: 'AKIAIDDWHYP7LGE3MD7A', secret: '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' }),
    from = "KBITS@eqtribe.com",
    fs = require('fs'),
    path = require('path'),
    baseUrl = process.env.CORS|| ("http://localhost" +":"+ process.env.port || "3001");

var stdCb = function(err, data) {
    err && console.error(err);
};

function createMailConfiguration(email , subject) {
    return {
        to: email, // list of receivers
        subject: subject, // Subject line
        altText: 'Welcome to KBITS', // plaintext body
        message: '<b>Thanks for Registering to our website</b>' // html body
    };
}

var createVerificationUrl = function(user){
	return baseUrl+"/verify_user_email?user_email="+user.email+"&tokan="+user._id+"&verificationTokan="+user.email_otp
};

var resetPasswordUrl = function(user){
    return baseUrl+"/reset_password?user_email="+user.email+"&tokan="+user._id+"&verificationTokan="+user.email_otp
};

var email = function() {
    return {
        send: function(data, cb) {
            cb =  cb || stdCb
            data.from = data.from || from;
            client.sendEmail(data, cb);
        },
        sendRaw: function(data, cb) {
            cb =  cb || stdCb
            data.from = data.from || from;
            client.sendRawEmail(data, cb);
        },
        registration: function(user, cb) {
            cb =  cb || stdCb
            if (user) {
                var email_config = createMailConfiguration(user.email , "Your registration with the Karnataka Startup Cell");
                var userName = user.first_name + " "+user.last_name||"";
                var template = fs.readFileSync('./public/templates/otp.html', 'utf8');
                var verificationUrl = createVerificationUrl(user);
                var message = template.replace(/_user_email_otp_|_user_name_/gi, function(str){
                	return (str == '_user_email_otp_')?verificationUrl:userName;
                });
                email_config.message = message;
                this.send(email_config, cb);
            }
        },
        forgotPassword: function(user, cb) {
            cb =  cb || stdCb
            if (user) {
                var email_config = createMailConfiguration(user.email , 'Startup Cell Application - Forgot Password');
                var userName = user.first_name + " "+user.last_name||"";
                var template = fs.readFileSync('./public/templates/forgotPassword.html', 'utf8');
                var verificationUrl = resetPasswordUrl(user);
                var message = template.replace(/_user_reset_password_|_user_name_/gi, function(str){
                    return (str == '_user_reset_password_')?verificationUrl:userName;
                });
                email_config.message = message;
                this.send(email_config, cb);
            }
        },

        kbitsMessage: function(user,message, cb) {
            cb =  cb || stdCb
            if (user) {
                var email_config = createMailConfiguration(user.email , "Test Mail");
                var userName = user.first_name + " "+user.last_name||"";
                var template = fs.readFileSync('./public/templates/generic_message.html', 'utf8');
                var message = template.replace(/_kbits_message_|_user_name_/gi, function(str){
                    return (str == '_kbits_message_')?message:userName;
                });
                email_config.message = message;
                this.send(email_config, cb);
            }
        },
        kbitsRejectionMessage: function(user,message, cb) {
            cb =  cb || stdCb
            if (user) {
                var email_config = createMailConfiguration(user.email , 'Startup Cell Application - Rejection');
                var userName = user.first_name + " "+user.last_name||"";
                var template = fs.readFileSync('./public/templates/rejection.html', 'utf8');
                var message = template.replace(/_kbits_message_|_user_name_/gi, function(str){
                    return (str == '_kbits_message_')?message:userName;
                });
                email_config.message = message;
                this.send(email_config, cb);
            }
        },
        kbitsSentBackMessage: function(user,message, cb) {
            cb =  cb || stdCb
            if (user) {
                var email_config = createMailConfiguration(user.email ,'Startup Cell Application - More Info Needed');
                var userName = user.first_name + " "+user.last_name||"";
                var template = fs.readFileSync('./public/templates/sent_back.html', 'utf8');
                var message = template.replace(/_kbits_message_|_user_name_/gi, function(str){
                    return (str == '_kbits_message_')?message:userName;
                });
                email_config.message = message;
                this.send(email_config, cb);
            }
        }
    }

};

module.exports.client = client;
module.exports.email = email;
