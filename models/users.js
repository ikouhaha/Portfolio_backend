const db = require('../helpers/mongodb')


const collection = "users"

exports.findByUsername = async function (username) {
  let data = await db.run_query(collection, {'username': username})
  return data
}

//list all the articles in the database
// exports.getAll = async function () {
  
//   let query = "select * FROM users;"
//   let data = await db.run_query(query)  
//   return data
// }

exports.getAll = async function () {
  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async function (id) {
  let data = await db.run_query(collection, {})
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