
const Passport = require('../helpers/passport.js')


let auth = async (ctx, next, havePublicUser) => {
    if (ctx.isAuthenticated()) {
        await next()
    }
    else if (havePublicUser && !ctx.header.authorization) {
        ctx.state.user = {}
        ctx.state.user.role = "public"
        await next()
    } else if(ctx.header.authorization&&ctx.header.authorization.startsWith("Basic"))  {
        await Passport.authenticate(['basic'])(ctx, next)
    } 

    //no auth
    //ctx.status = 401

    //next()
}

module.exports = auth
