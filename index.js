const Koa = require('koa')
const app = new Koa()

const auth = require('./routes/auth.js')
const breeds = require('./routes/breeds.js')
const dogs = require('./routes/dogs.js')
const user = require('./routes/users')
const company = require('./routes/companies')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('./helpers/passport')

const static = require('koa-static-router')
const cors = require('@koa/cors');


app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
    await next();
})


const options = {
    origin: ['http://localhost:3000'],
    
    

}


app.use(cors(options));


app.use(bodyParser())
// Sessions
app.use(static({ dir: 'docs', router: '/doc/' }))

app.keys = ['secret']
const conf = {
    encode: json => JSON.stringify(json),
    decode: str => JSON.parse(str),
    

}
app.use(session(conf, app))
app.use(passport.initialize())
app.use(passport.session())

app.use(auth.routes())
app.use(breeds.routes())
app.use(dogs.routes())
app.use(user.routes())
app.use(company.routes())


let port = process.env.PORT || 10888


app.listen(port)