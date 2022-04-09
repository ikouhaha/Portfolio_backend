

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

exports.clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

exports.comparePwd = (pwd, hash) => {
    return bcrypt.compareSync(pwd, hash)
}

exports.createErrorResponse = (ctx, ex,code = 500) => {
    if (ex.code == 11000) {
        let keys = Object.keys(ex.keyValue)
        let values = Object.values(ex.keyValue)
        keys = keys.join(',')
        ctx.status = code
        ctx.body = { "status": code, "description": `The following ${keys}:${values} has been registered` }
    } else {
        ctx.status = code
        ctx.body = { "status": code, "description": ex.message }
    }
}

exports.filterPrepare = (filterData) => {
    let rv = this.clone(filterData);
    Object.keys(rv).map((key, index) => {
        if(typeof(rv[key])=="string"){
            rv[key] = new RegExp(".*"+ rv[key] +".*")
        };
    });
    return rv;
}


//console.log(this.getHash("123"));