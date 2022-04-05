const passport = require('koa-passport')
const basicAuth = require('../strategies/basic')

passport.use(basicAuth)

let auth = async (ctx, next, havePublicUser) => {
    if (havePublicUser && !ctx.header.authorization) {
        ctx.state.user = {}
        ctx.state.user.role = "public"
        await next()
    } else {

        await passport.authenticate(['basic'], { session: false })(ctx, next)
    }


    //next()
}

module.exports = auth
