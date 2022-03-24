const db = require('../helpers/mongodb')


const collection = "users"


exports.getAll = async (page, limite, order) => {
  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async (id) => {
  let data = await db.run_query(collection, { 'id': parseInt(id) })
  return data
}

exports.getByUsername = async (username) => {
  let data = await db.run_query(collection, { 'username': username })
  return data
}
exports.add = async (document) => {
  let status = await db.run_insert(collection, document)
  return status
}

exports.update = async (id,document) => {
  let status = await db.run_update(collection, id,document)
  return status
}
