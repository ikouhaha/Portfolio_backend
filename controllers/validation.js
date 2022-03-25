const {Validator,ValidationError} = require('jsonschema')
//const ValidationError  = require('sequelize/types')

const breeds = require('../schemas/breeds.schema.js')
const user = require('../schemas/user.schema.js')
const v = new Validator()


exports.validateBreed = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,breeds,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateUser = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,user,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}