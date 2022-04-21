const Router = require('koa-router')

const companyModel = require('../models/company')
const dogModel = require('../models/dogs')
const model = require('../models/users')
const can = require('../permission/user')
const auth = require('../controllers/auth')
const authPublic = require('../controllers/authWithPublic')
const router = Router({ prefix: '/api/v1/users' })
const util = require('../helpers/util')
const { validateUser } = require('../controllers/validation')

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})', auth, getById);
router.post('/', validateUser, createUser) //for public user register, so without auth
router.put('/:id([0-9]{1,})', auth, validateUser, updateUser)
router.del('/:id([0-9]{1,})', auth, deleteUser)
router.put('/p/:id([0-9]{1,})', auth, validateUser, updateUserPwd)


router.put('/favourite/:dogId([0-9]{1,})', authPublic, favouriteDog)
router.put('/unfavourite/:dogId([0-9]{1,})', auth, unfavouriteDog)


router.get('/profile', profile)

async function profile(ctx, ext) {
  if (ctx.isAuthenticated()) {
    ctx.status = 200
    const user = { ...ctx.state.user, isLogin: true }
    delete user.googleId
    delete user.password
    ctx.body = user
  } else {
    ctx.status = 204

  }
}

async function getAll(ctx) {
  try {
    ////check the role permission
    const permission = can.readAll(ctx.state.user)
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const result = await model.getAll()
      if (result.length) {
        ctx.body = result;
      }
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function getById(ctx) {
  try {
    let id = parseInt(ctx.params.id)
    //check the role
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

async function createUser(ctx) {
  try {
    const body = ctx.request.body
    body.dateRegistered = new Date()
    body.password = util.getHash(body.password)
    body.favourites = {}
    if (body.role == "staff") {
      let company = await companyModel.findByCode(body.companyCode)
      if (!company) {
        throw new Error("can't found the company");
      } else {
        body.company = company;
      }

    }

    let result = await model.createUser(body)
    if (result) {
      result.message = "create user successfully"
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

async function deleteUser(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    //check the role permission
    const permission = can.delete(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
      return;
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

async function updateUser(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    //check the role permission
    const permission = can.update(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
      return;
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

async function favouriteDog(ctx) {

  try {
    let dogId = parseInt(ctx.params.dogId)

    //check the dog is exists
    let dogFind = await dogModel.getById(dogId)

    if(!dogFind){
      ctx.status = 404
      ctx.body = "The dogs not found"
      return;
    }
    //everyone can like the dog (data) , so no need check permission

    let result = await model.updateUser(ctx.state.user.id, {
      favourites: {
        [dogId]: true
      }
    })
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

async function unfavouriteDog(ctx) {

  try {
    let dogId = parseInt(ctx.params.dogId)

    //check the dog is exists
    let dogFind = await dogModel.getById(dogId)

    if(!dogFind){
      ctx.status = 404
      ctx.body = "The dogs not found"
      return;
    }
    //everyone can like the dog (data) , so no need check permission

    let result = await model.updateUser(ctx.state.user.id, {
      favourites: {
        [dogId]: false
      }
    })
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
    //check the role
    const permission = can.update(ctx.state.user, { "id": id })
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