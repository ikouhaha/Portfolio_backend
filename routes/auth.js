const Router = require('koa-router')
const router = Router({ prefix: '/api/v1/auth' })
const util = require('../helpers/util')
const passport = require('../helpers/passport.js')
const userModel = require("../models/users")



router.post('/', signin)


router.get('/signout', signout)
router.post('/google/token', googleSigninByToken)

//router.get('/google/callback', googleCallBack) 
//basic login
async function signin(ctx, next) {
  try {
    await passport.authenticate(['basic'])(ctx, next)
    if (ctx.isAuthenticated()) {
      await ctx.login(ctx.state.user)
      const user = {...ctx.state.user,isLogin:true}
      console.log("sign in successfully")
      ctx.status = 200
      ctx.body = user
    } else {
      ctx.status = 401
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function googleSigninByToken(ctx, next) {

  try {
    //await PassportGoogle.authenticate('google')(ctx, next)
    await passport.authenticate('google-token')(ctx, next)
    if (ctx.isAuthenticated()) {
      
      await ctx.login(ctx.state.user)
      const user = {...ctx.state.user,isLogin:true}
      ctx.status = 200
      ctx.body = user


    } else {
      ctx.status = 401
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}



async function signout(ctx) {
  try {
    if (ctx.isAuthenticated()) {
      await ctx.logout()
      ctx.session = null;
      console.log("sign out successfully")
      
    } 
    ctx.status = 200
      ctx.body = "sign out successfully"
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


module.exports = router