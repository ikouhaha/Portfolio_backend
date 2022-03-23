const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const router = Router({ prefix: '/api/v1' })
const auth = require('../controllers/auth')

router.get('/', publicAPI)
//first thing then auth , then privateAPI
router.get('/private', auth, privateAPI)

function publicAPI(ctx) {
    ctx.body = {
        message: 'Public API'
    }
}


function privateAPI(ctx) {
        const user = ctx.state.user
        ctx.body = {
            message: `Hello, ${user}. You registered on ${user.dateRegisteded}`
        }
}

module.exports = router