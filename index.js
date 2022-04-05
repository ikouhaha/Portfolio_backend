const Koa = require('koa')
const app = new Koa()

const breeds = require('./routes/breeds.js')
const dogs = require('./routes/dogs.js')
const user = require('./routes/users')
const company = require('./routes/company')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('./helpers/passport')

app.use(bodyParser())
// Sessions

app.keys = ['secret']
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())


app.use(breeds.routes())
app.use(dogs.routes())
app.use(user.routes())
app.use(company.routes())




let port = process.env.PORT || 10888


app.listen(port)