const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/users')
const can = require('../permission/user')
const auth = require('../controllers/auth')
const router = Router({prefix: '/api/v1/users'})
const util = require('../helpers/util')
const {validateUser} = require('../controllers/validation')

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})',auth, getById);
router.post('/', bodyParser(), validateUser, createUser) //for public user register

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

async function createUser(ctx) {
  const body = ctx.request.body
  body.dateRegistered = new Date()
  body.password = util.getHash(body.password)
  let result = await model.createUser(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status=201
    ctx.body = "{}"
  }
}

module.exports = router