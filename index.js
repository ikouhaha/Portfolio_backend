const Koa = require('koa')
const app = new Koa()

const breeds = require('./routes/breeds.js')


//app.use(dogs.routes())
app.use(breeds.routes())


let port = process.env.PORT || 10888


app.listen(port)