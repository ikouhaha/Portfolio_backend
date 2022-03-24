const db = require('../helpers/database')


exports.findByUsername = async function (username) {
  const query = 'select * from users where username = ?'
  const user = await db.run_query(query, [username])
  return user
}

//list all the articles in the database
exports.getAll = async function () {
  // TODO: use page, limit, order to give pagination
  let query = "select * FROM users;"
  let data = await db.run_query(query)  
  return data
}

exports.getById = async function (id) {
  // TODO: use page, limit, order to give pagination
  let query = "select * FROM users where id = ?;"
  let data = await db.run_query(query,[id])  
  return data
}