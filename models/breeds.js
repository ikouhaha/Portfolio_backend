const db = require('../helpers/mongodb')


const collection = "breeds"


exports.getAll = async (page, limite, order) => {
  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async (id) => {
  let data = await db.run_one_query(collection, { 'id': parseInt(id) })
  return data
}






