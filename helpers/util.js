

const bcrypt = require('bcrypt');

const saltRounds = 10;


exports.getHash = (str) => {
    let rv = "";
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(str, salt, function (err, hash) {
            // returns hash
            console.log(hash);
            rv = hash
        });
    });
    return rv;
}

