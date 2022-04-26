const Koa = require('koa')
const socketIo = require('socket.io');

require('dotenv').config()

const app = new Koa()

const auth = require('./routes/auth.js')
const breeds = require('./routes/breeds.js')
const dogs = require('./routes/dogs.js')
const user = require('./routes/users')
const chat = require('./routes/chat')
const company = require('./routes/companies')
const favourites = require('./routes/favourites')
const passport = require('./helpers/passport')


const bodyParser = require('koa-bodyparser')

const static = require('koa-static-router')
const cors = require('@koa/cors');



console.log('COR_ORIGINS',process.env.COR_ORIGINS)
const origin = process.env.COR_ORIGINS||'http://localhost:3000'
const options = {
    origin: [origin]

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
app.use(favourites.routes())


const port = process.env.PORT || 10888
const host = process.env.HOST 

console.log('host',host)
console.log('port',port)
console.log('watch7')


let server
if(host){
    server = app.listen(port,host)
}else{
    server = app.listen(port)
}

const io = socketIo(server, { cors: { origin: origin } });
chat(io)
