var models = require('../models');
var User = models.User;
var SuperUser = models.SuperUser
var passport = require('passport');
var LocalStrategy = require('passport-local');
module.exports = function(passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            return user;
        }).asCallback(done);
    });

    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            return User.findOne({ email: email }).select('+password').then(function(user) {
                if (user && User.comparePassword(password, user.password)) {
                    return user;
                }
            }).asCallback(done);
        }));

}
