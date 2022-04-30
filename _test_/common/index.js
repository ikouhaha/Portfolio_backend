
const Koa = require('koa')
require('dotenv').config()

const app = new Koa()

const auth = require('../../routes/auth.js')
const breeds = require('../../routes/breeds.js')
const dogs = require('../../routes/dogs.js')
const user = require('../../routes/users')
const comments = require('../../routes/comments')
const company = require('../../routes/companies')
const favourites = require('../../routes/favourites')
const passport = require('../../helpers/passport')

app.use(passport.initialize())
app.use(auth.routes())
app.use(breeds.routes())
app.use(dogs.routes())
app.use(user.routes())
app.use(company.routes())
app.use(favourites.routes())
app.use(comments.routes())

module.exports = app