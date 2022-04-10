

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

        result = await users.findByEmail(profile._json.email)

        if (result) {
            user = result

        } else {
            console.log(`No user found with email ${email}`)
            //create user
            createUser = {}
            createUser.email = profile._json.email
            createUser.username = profile._json.email
            createUser.firstName = profile._json.family_name
            createUser.lastName = profile._json.given_name
            createUser.avatarUrl = profile._json.picture
            createUser.role = "user"
            createUser.needUpdateUser = true
            await users.createUser(createUser)
            user = await users.findByEmail(profile._json.email)
            if(!user){
                return done(null, false);
            }
        }

        


        return done(null, user);
    }
    catch (error) {
        console.error(`Error during authentication for user ${error}`)
        return done(null, user);
    }

    
}

const strategy = new GoogleTokenStrategy({
    clientID: info.config.googleClientID,
    clientSecret: info.config.googleClientSecret,
    callbackURL: info.config.googleCallbackURL,

}, authUser
)


module.exports = strategy

