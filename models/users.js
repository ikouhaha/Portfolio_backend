const db = require('../helpers/mongodb')


const collection = "articles"

exports.findByUsername = async function (username) {
  const query = 'select * from users where username = ?'
  const user = await db.run_query(query, [username])
  return user
}

//list all the articles in the database
exports.getAll = async function () {
  
  let query = "select * FROM users;"
  let data = await db.run_query(query)  
  return data
}

exports.getById = async function (id) {
  
  let query = "select * FROM users where id = ?;"
  let data = await db.run_query(query,[id])  
  return data
}

// exports.createUser = async function (user) {
//   let keys = Object.keys(user)
//   let values = Object.values(user)  
//   keys = keys.join(',')   
//   let parm = ''
//   for(i=0; i<values.length; i++){ parm +='?,'}
//   parm=parm.slice(0,-1)
//   let query = `INSERT INTO users (${keys}) VALUES (${parm})`
//   try{
//     await db.run_query(query, values)  
//     return {"status": 201}
//   } catch(error) {
//     return error
//   }
// }

exports.createUser = async function (user) {
  let status = await db.run_insert(collection, user)
  return status
}