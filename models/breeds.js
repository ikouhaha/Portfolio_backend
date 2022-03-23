const db = require('../helpers/mongodb')


const collection = "breeds"


exports.getAll = async (page, limite, order) => {

  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async (id) => {
  let data = await db.run_query(collection, { 'authorID': parseInt(id) })
  return data
}
exports.add = async (document) => {
  let status = await db.run_insert(collection, document)
  return status
}
exports.addMany = async (document) => {
  let status = await db.run_insert_many(collection, document)
  return status
}









