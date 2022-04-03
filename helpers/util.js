

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');


exports.getHash = (str) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(str, salt);
    return hash;
}

exports.genUUID = () => {
    return uuidv4()
}

exports.comparePwd = (pwd,hash) => {
    return bcrypt.compareSync(pwd,hash)
}

exports.createErrorResponse = (ctx,ex) => {
    if(ex.code==11000){
        let keys = Object.keys(ex.keyValue)
        let values = Object.values(ex.keyValue)  
        keys = keys.join(',') 
        ctx.status = 500
        ctx.body = { "status": 500, "description": `The following ${keys}:${values} has been registered` }
    }else{
        ctx.status = 500
        ctx.body = { "status": 500, "description": ex.message }
    }
}

//console.log(this.getHash("123"));