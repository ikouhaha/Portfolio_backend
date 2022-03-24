const Koa = require('koa')
const app = new Koa()

const breeds = require('./routes/breeds.js')
const user = require('./routes/users')

//app.use(dogs.routes())
app.use(breeds.routes())
app.use(user.routes())



let port = process.env.PORT || 10888


app.listen(port)