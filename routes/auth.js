const Router = require('koa-router')
const router = Router({ prefix: '/api/v1/auth' })
const util = require('../helpers/util')
const passport = require('../helpers/passport.js')
const config = require('../config').config;
const userModel = require("../models/users")

const jwt = require('jsonwebtoken');

router.post('/',passport.authenticate(['basic'],{session:false}), signin)


router.get('/signout',signout)
router.post('/google/token',passport.authenticate(['google-token'],{session:false}), googleSigninByToken)

async function signin(ctx, next) {
  try {
    if (ctx.isAuthenticated()) {
      if(ctx.state.user.status){
        ctx.status = ctx.state.user.status
        ctx.message = ctx.state.user.message
        return
      }
      const token = await jwt.sign(ctx.state.user, config.secret, { expiresIn: config.tokenExpired });
      const user = {...ctx.state.user,isLogin:true,token: 'Bearer ' + token}
      console.log("sign in successfully "+token)
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
    
    if (ctx.isAuthenticated()) {
      if(ctx.state.user.status){
        ctx.status = ctx.state.user.status
        ctx.message = ctx.state.user.message
        return
      }
      const token = await jwt.sign(ctx.state.user, config.secret, { expiresIn: config.tokenExpired });
      const user = {...ctx.state.user,isLogin:true,token: 'Bearer ' + token}
      console.log("google sign in successfully "+token)
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
    
    ctx.status = 200
    ctx.body = {isLogin:false,token: ''}
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


module.exports = router