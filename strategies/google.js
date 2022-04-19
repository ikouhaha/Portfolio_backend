

const info = require("../config")
const util = require("../helpers/util")
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const users = require('../models/users')


const authUser = async (accessToken, refreshToken, profile, done) => {
    // look up the user and check the email if the user exists
    // call done() with either an error or the user, depending on outcome
    try {
        if (!profile) {
            return done(null, false); //without profile
        }
        let email = profile.email
        let result
        let user

        result = await users.findByGoogleId(profile.id)
        
        if (!result) {
            return done(new Error("Please register first")) 
        } 

        

        user = result


        return done(null, user);
    }
    catch (error) {
        console.error(`Error during authentication for user ${error}`)
        return done(error);
    }

    
}

const strategy = new GoogleTokenStrategy({
    clientID: info.config.googleClientID,
    clientSecret: info.config.googleClientSecret,
    callbackURL: info.config.googleCallbackURL,

}, authUser
)


module.exports = strategy
