const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/dogs')
const can = require('../permission/dog')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/dogs' })
const util = require('../helpers/util')
const { validateDog } = require('../controllers/validation')

router.get('/',(ctx,next)=>auth(ctx,next,true),getAll) //for public user
router.get('/:id([0-9]{1,})',(ctx,next)=>auth(ctx,next,true), getById); // for public user
router.post('/', bodyParser(), auth, validateDog, createDog)
router.put('/:id([0-9]{1,})', bodyParser(), auth, validateDog, updateDog)
router.del('/:id([0-9]{1,})', bodyParser(), auth, validateDog, deleteDog)


async function getAll(ctx, next) {
  try {
    const results = await model.getAll()
    if (results.length) {
      for(result of results){
        const canUpdate = can.update(ctx.state.user,result).granted
        const canDelete = can.delete(ctx.state.user,result).granted
        result.canUpdate = canUpdate;
        result.canDelete = canDelete;
      }
     
      ctx.body = results;
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function getById(ctx) {
  try {
    let id = parseInt(ctx.params.id)
    const permission = can.read(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const result = await model.getById(id)
      if (result.length) {
        ctx.body = result;
      }
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function createDog(ctx) {
  try {
    const body = ctx.request.body

    const permission = can.create(ctx.state.user)
    if (!permission.granted) {
      ctx.status = 403;
      return;
    } 

    let result = await model.add(body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }

}

async function deleteDog(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    const permission = can.delete(ctx.state.user, body)
    if (!permission.granted) {
      ctx.status = 403;
    }
    let result = await model.deleteUser(id)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function updateDog(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    const permission = can.update(ctx.state.user, body)
    if (!permission.granted) {
      ctx.status = 403;
    }
    let result = await model.updateUser(id, body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function updateUserPwd(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    body.password = util.getHash(body.password)
    const permission = can.update(ctx.state.user, body)
    if (!permission.granted) {
      ctx.status = 403;
    }
    let result = await model.updateUser(id, body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}



module.exports = router