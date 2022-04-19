const Router = require('koa-router')
const router = Router({ prefix: '/api/v1/auth' })
const util = require('../helpers/util')
const passport = require('../helpers/passport.js')
const userModel = require("../models/users")



router.post('/', signin)
router.get('/signout', signout)

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/google/callback', googleSignin)

router.post('/google/token', googleSigninByToken)

//router.get('/google/callback', googleCallBack) 
//basic login
async function signin(ctx, next) {
  try {
    await passport.authenticate(['basic'])(ctx, next)
    if (ctx.isAuthenticated()) {
      await ctx.login(ctx.state.user)
      console.log("sign in successfully")
      ctx.status = 200
      ctx.body = {
        message: "sign in successfully",
        user: ctx.state.user
      }
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
      user = ctx.state.user
      await ctx.login(user)
      ctx.status = 200
      ctx.body = {
        message: "sign in successfully",
        user: ctx.state.user
      }


    } else {
      ctx.status = 401
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


async function googleSignin(ctx, next) {

  try {
    await passport.authenticate('google')(ctx, next)

    if (ctx.isAuthenticated()) {
      user = ctx.state.user
      await ctx.login(user)
      console.log("sign in successfully")

      ctx.status = 200
      ctx.body = "sign in successfully"


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
      console.log("sign out successfully")
      
    } 
    ctx.status = 200
      ctx.body = "sign out successfully"
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


module.exports = router