var UserController = {};
var models = require('../models');
var base = require('../lib/common/base');
var User = models.User;
var Startup = models.Startup;
var email = require('../lib/email').email();
var passport = require('passport');
var _ = require("lodash");

UserController.createUser = function(req, res) {
    var message = "";
    var requiredField = ['first_name', 'last_name', 'password', 'email', 'mobile_number', 'designation', 'type', 'confirm_password'];

    requiredField.forEach(function(field) {
        if (Object.keys(req.body).indexOf(field) < 0) {
            message = 'Please provide ' + field.replace('_', ' ');
            return res.apiError(message);
        }
    });

    if (req.body.password != req.body.confirm_password) {
        return res.apiError("Password does not match");
    }

    return User.findOne({ email: req.body.email }).then(function(user) {
            if (user) {
                throw new Error('This email is already exists');
            }
            return User.findOne({ mobile_number: req.body.mobile_number })
        })
        .then(function(user) {
            if (user) {
                return res.apiError('This mobile number already exists');
            }
            var newUser = new User({
                first_name: _.capitalize(req.body.first_name),
                last_name: _.capitalize(req.body.last_name),
                password: User.generateHash(req.body.password),
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                company_name: req.body.company_name || "",
                website_url: req.body.website_url || "",
                designation: req.body.designation,
                type: req.body.type,
                token: base.getToken(32, 'str'),
                email_otp: base.getToken(10, 'str')
            });
            return newUser.save();
        })
        .then(function(user) {

            if (user && user.type.toLowerCase() == "startup") {
                var newStartup = new Startup({
                    basic_details: {
                        name: user.company_name,
                        url: user.website_url
                    },
                    // stage:{contentType: "Welcome",time: new Date(), designation: "User"},
                    user_id: user._id
                })
                // email.registration(user);
                return newStartup.save().then(function() {
                    return res.apiSuccess({ user: user }, 'Registration completed.');
                });
            }

            return res.apiSuccess({ user: user }, "Registration completed")
        })
        .catch(function(error) {
            res.apiError(error);
        })
};


// UserController.login = function(req, res) {
//     var body = req.body;
//     User.findOne({ email: body.email }).select('+password').then(function(user) {
//         if (!user) {
//             return res.apiError("Email does not exists");
//         }
//         if (user && !User.comparePassword(body.password, user.password)) {
//             return res.apiError("Password is not correct");
//         }
//         user.token = base.getToken(32, 'str')
//         user.save()
//             .then(function(user) {
//                 return res.apiSuccess({ user: user }, "Successfully logged in");
//             });
//     });
// };



UserController.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.apiError("Login Failed! try again");
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.apiSuccess({ user: req.user }, "Successfully logged in");
        });
    })(req, res, next);
}


UserController.verifyUserEmail = function(req, res) {
    var param = req.query;
    User.findOne({ email: param.user_email, _id: param.tokan, email_otp: param.verificationTokan }).then(function(user) {
        if (user) {
            user.is_email_verified = true;
            user.save();
            res.apiSuccess({ message: "Email verified" })
        } else {
            res.apiError("No user registered with provided email.Email has not verified.");
        }
    })

};

UserController.kbitsMessage = function(req, res) {
    Startup.findOne({ _id: req.body.id }).then(function(startup) {
            if (req.body.state == "Rejected") {
                startup.reason_for_rejection = req.body.message;
            } else if (req.body.state == "UserAction") {
                startup.reason_for_send_to_user = req.body.message;
            }
            return startup.save();
        })
        .then(function(startup) {
            return User.findOne({ _id: req.body.startup_user })
        })
        .then(function(user) {
            if (user) {
                // if (req.body.state == "Rejected") {
                //     email.kbitsRejectionMessage(user, req.body.message);

                // } else if (req.body.state == "UserAction") {
                //     email.kbitsSentBackMessage(user, req.body.message);
                // }
                return res.apiSuccess({}, "The email has been sent.");
            }
            return res.apiError("The email is not registered in the application");
        })

};

// **********sendMailForForgotPassword is not being used as of 8Nov2016*******
UserController.sendMailForForgotPassword = function(req, res) {
        User.findOne({ email: req.body.email }).select("+email_otp")
            .then(function(user) {
                if (user) {
                    // email.forgotPassword(user);
                    return res.apiSuccess({}, "Successfully send reset password mail");
                }
                return res.apiError("The email is not registered in the application");
            })
    }
    //********** End of Comment***********************

UserController.changePassword = function(req, res) {
    var query = req.body.query;
    return User.findOne({ email: query.user_email }).then(function(user) {
        if (!user) {
            return res.apiError("The provided recovery email is not registered in the system");
        } else {
            user.password = User.generateHash(req.body.password);
            user.email_otp = base.getToken(10, 'str');
            user.is_email_verified = false;
            return user.save().then(function() {
                // email.registration(user);
                return res.apiSuccess({}, "Password has been changed and a verification Email has been sent to the registered email id. Please verify your email.")
            })
        }
    })

}

module.exports = UserController;
