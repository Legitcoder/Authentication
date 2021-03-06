const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

//Verifies email and password
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify this username and password, call done with the user
    // if it is the correct username and password
    // otherwise call done with false
    User.findOne({ email: email.toLowerCase() }, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }

        //compare passwords is password equal to user.password?
        user.comparePassword(password, function(err, isMatch) {
            if(err) return done(err);
            if(!isMatch) return done(null, false);
            return done(null, user);
        })
    })
});

//Setup Options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create JWT strategy
//Verifies Token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in out data base
    // If it does, call done with that otherwise
    // call done without a user object
    User.findById(payload.sub, function(err, user) {
        if(err) { return done(err, false); }
        if(user) {
            done(null, user);
        }
        else{
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);