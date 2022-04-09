
const info = require("../config")
const GoogleStrategy = require('passport-google-oauth2').Strategy


const authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}

const strategy = new GoogleStrategy({
    clientID: info.config.googleClientID,
    clientSecret: info.config.googleClientSecret,
    callbackURL: info.config.googleCallbackURL,
    passReqToCallback   : true
    },authUser
)


module.exports = strategy

