const Router = require('koa-router')
const model = require('../models/users')
const can = require('../permission/user')
const auth = require('../controllers/auth')
const router = Router({prefix: '/api/v1/users'})

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})',auth, getById);

async function getAll(ctx) {
  const permission = can.readAll(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const result = await model.getAll()
    if (result.length) {
      ctx.body = result;
    }    
  }
}

async function getById(ctx) {
  let id = parseInt(ctx.params.id)
  const permission = can.read(ctx.state.user,{"id":id})
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const result = await model.getById(id)
    if (result.length) {
      ctx.body = result;
    }    
  }
}

module.exports = router