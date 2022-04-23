const Koa = require('koa')


require('dotenv').config()


const app = new Koa()

const auth = require('./routes/auth.js')
const breeds = require('./routes/breeds.js')
const dogs = require('./routes/dogs.js')
const user = require('./routes/users')
const company = require('./routes/companies')
const passport = require('./helpers/passport')


const bodyParser = require('koa-bodyparser')

const static = require('koa-static-router')
const cors = require('@koa/cors');



const options = {
    origin: process.env.COR_ORIGINS ? process.env.COR_ORIGINS.split(',') : ['http://localhost:3000']



}


app.use(cors(options));


// Sessions
app.use(static({ dir: 'docs', router: '/doc/' }))
app.use(bodyParser())
app.use(passport.initialize())
app.use(auth.routes())
app.use(breeds.routes())
app.use(dogs.routes())
app.use(user.routes())
app.use(company.routes())


let port = process.env.PORT || 10888
let host = process.env.HOST 

console.log(port)
console.log('watch4')

if(host){
    app.listen(port,host)
}else{
    app.listen(port)
}
