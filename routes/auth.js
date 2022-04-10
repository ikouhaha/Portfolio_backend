const Router = require('koa-router')
const router = Router({ prefix: '/api/v1/auth' })
const util = require('../helpers/util')
const Passport = require('../helpers/passport.js')
const PassportGoogle = require('../helpers/passportGoogle.js')
const userModel = require("../models/users")



router.post('/signin', signin) //for public user register
router.get('/signout', signout) //for public user register

router.get('/google/signin',PassportGoogle.authenticate('google', { scope: [ 'email', 'profile' ]})) 
router.get('/google/callback', googleSignin) 
router.post('/google/token', PassportGoogle.authenticate('google-token'),googleSigninByToken)

//router.get('/google/callback', googleCallBack) 
//basic login
async function signin(ctx,next) {
  try {
    await Passport.authenticate(['basic'])(ctx, next)
    if (ctx.isAuthenticated()) {
      await ctx.login(ctx.state.user)
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

async function googleSigninByToken(ctx,next) {
  
  try {
    //await PassportGoogle.authenticate('google')(ctx, next)
    
    if (ctx.isAuthenticated()) {
      user = ctx.state.user
      await ctx.login(user)
      console.log("sign in successfully")
      if(user.needUpdateUser){
        ctx.status = 202
        ctx.body = "sign in successfully but need to update profile"
      }else{
        ctx.status = 200
        ctx.body = "sign in successfully"
      }
      
    } else {
      ctx.status = 401
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


async function googleSignin(ctx,next) {
  
  try {
    await PassportGoogle.authenticate('google')(ctx, next)
    
    if (ctx.isAuthenticated()) {
      user = ctx.state.user
      await ctx.login(user)
      console.log("sign in successfully")
      if(user.needUpdateUser){
        ctx.status = 202
        ctx.body = "sign in successfully but need to update profile"
      }else{
        ctx.status = 200
        ctx.body = "sign in successfully"
      }
      
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
      ctx.status = 200
      ctx.body = "sign out successfully"
    } else {
      ctx.status = 401
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


module.exports = router