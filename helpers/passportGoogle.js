const passport = require('koa-passport')

const googleAuth = require('../strategies/google')



passport.use(googleAuth)



passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    return done(null, user)
})


module.exports = passport