const {Validator,ValidationError} = require('jsonschema')
//const ValidationError  = require('sequelize/types')

const breeds = require('../schemas/breedsArray.schema.js')
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