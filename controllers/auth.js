const Passport = require('../helpers/passport.js')

let auth = async (ctx, next, havePublicUser) => {
    if(ctx.isAuthenticated()){
        await next()
    }
    else if (havePublicUser && !ctx.header.authorization) {
        ctx.state.user = {}
        ctx.state.user.role = "public"
        await next()
    } else {
        await Passport.authenticate(['basic'])(ctx, next)
    }


    //next()
}

module.exports = auth
