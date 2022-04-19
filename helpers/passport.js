const passport = require('koa-passport')
const info = require('../config')
const basicAuth = require('../strategies/basic')
const googleAuth = require('../strategies/google')

passport.use(basicAuth)
passport.use(googleAuth)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    return done(null, user)
})


module.exports = passport