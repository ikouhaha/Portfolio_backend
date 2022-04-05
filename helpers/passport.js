const passport = require('koa-passport')
const basicAuth = require('../strategies/basic')

passport.use(basicAuth)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    return done(null, user)
})


module.exports = passport