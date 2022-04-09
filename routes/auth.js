const Router = require('koa-router')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/auth' })
const util = require('../helpers/util')


router.get('/signin',auth, signin) //for public user register
router.get('/signout', signout) //for public user register
router.get('/google/callback', googleCallBack) 

async function signin(ctx) {
  try {
    if (ctx.isAuthenticated()) {
      await ctx.login(ctx.state.user)
      console.log("sign in successfully")
      ctx.status = 200
    } else {
      ctx.status = 401
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function googleCallBack(ctx) {
  try {
    if (ctx.isAuthenticated()) {
      await ctx.login(ctx.state.user)
      console.log("sign in successfully")
      ctx.status = 200
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

    } else {
      ctx.status = 401
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


module.exports = router