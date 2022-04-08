const Router = require('koa-router')


const userModel = require('../models/users')
const breedModel = require('../models/breeds')
const model = require('../models/dogs')
const can = require('../permission/dog')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/dogs' })
const util = require('../helpers/util')
const { validateDog,validateDogFilter } = require('../controllers/validation')

router.get('/', (ctx, next) => auth(ctx, next, true),validateDogFilter, getAll) //for public user
router.get('/:id([0-9]{1,})', (ctx, next) => auth(ctx, next, true), getById); // for public user
router.post('/', auth, validateDog, createDog)
router.put('/:id([0-9]{1,})', auth, validateDog, updateDog)
router.del('/:id([0-9]{1,})', auth, validateDog, deleteDog)


async function getAll(ctx, next) {
  try {
    const body = ctx.request.body
    let filterData = {} ;
    if(body.filterData){
      filterData = util.filterPrepare(body.filterData)
    }
    const results = await model.getAllByFilter(filterData,body.page,body.limit,body.order)
    if (results.length) {
      for (result of results) {
        const canUpdate = can.update(ctx.state.user, result).granted
        const canDelete = can.delete(ctx.state.user, result).granted
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
    const result = await model.getById(id)
    if (result) {
      const canUpdate = can.update(ctx.state.user, result).granted
      const canDelete = can.delete(ctx.state.user, result).granted
      const breed = await breedModel.getById(result.breedID)
      const createBy = await userModel.getById(result.createdBy)
      result.canUpdate = canUpdate;
      result.canDelete = canDelete;
      ctx.body = result;
      result.breed = breed
      result.createBy = createBy
      
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function createDog(ctx) {
  try {
    const body = ctx.request.body
    const permission = can.create(ctx.state.user, body)
    if (!permission.granted) {
      ctx.status = 403;
      return;
    }
    const breed = await breedModel.getById(body.breedID)
    const createBy = await userModel.getById(body.createdBy)
    body.breed = breed;
    body.createUser = createBy;
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
    let id = ctx.params.id
    const body = ctx.request.body
    const permission = can.delete(ctx.state.user, body)
    if (!permission.granted) {
      ctx.status = 403;
      return;
    }
    let result = await model.delete(id)
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
    let id = ctx.params.id
    const body = ctx.request.body
    const permission = can.update(ctx.state.user, body)
    if (!permission.granted) {
      ctx.status = 403;
      return;
    }

    const breed = await breedModel.getById(body.breedID)
    const createBy = await userModel.getById(body.createdBy)
    body.breed = breed;
    body.createUser = createBy;
    
    let result = await model.update(id, body)
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