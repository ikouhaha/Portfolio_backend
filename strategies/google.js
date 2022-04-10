

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

        result = await users.findByEmail(profile.email)

        if (result) {
           
            user = result
            if (util.isEmpty(result.username)) {
                user.needUpdateUser = true
            }

        } else {
            console.log(`No user found with email ${email}`)
            //create user
            createUser = {}
            createUser.email = profile.emails[0].value
            createUser.username = profile.emails[0].value
            createUser.firstName = profile.name.familyName
            createUser.lastName = profile.name.givenName
            createUser.avatarUrl = profile.picture
            await users.createUser(createUser)
            user = await users.findByEmail(profile.email)
            if(!user){
                return done(null, false);
            }
            
            user.needUpdateUser = true
        }

        


        return done(null, user);
    }
    catch (error) {
        console.error(`Error during authentication for user ${error}`)
        return done(error)
    }

    
}

const strategy = new GoogleTokenStrategy({
    clientID: info.config.googleClientID,
    clientSecret: info.config.googleClientSecret,
    callbackURL: info.config.googleCallbackURL,

}, authUser
)


module.exports = strategy

