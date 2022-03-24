

const bcrypt = require('bcryptjs');

exports.getHash = (str) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(str, salt);
    return hash;
}


exports.comparePwd = (pwd,hash) => {
    return bcrypt.compareSync(pwd,hash)
}

//console.log(this.getHash("123"));