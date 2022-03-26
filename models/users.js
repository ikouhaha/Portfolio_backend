const db = require('../helpers/mongodb')
const util = require('../helpers/util')

const collection = "users"

exports.findByUsername = async function (username) {
  let data = await db.run_query(collection, {'username': username})
  return data
}

exports.getAll = async function () {
  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async function (id) {
  let data = await db.run_query(collection, {'id':id})
  return data
}


exports.createUser = async function (user) {
  let status = await db.run_insert(collection, user)
  return status
}

exports.updateUser = async function (id,user){
  let status = await db.run_update(collection,id, user)
  return status
}

exports.deleteUser = async function (id){
  let status = await db.run_delete(collection, id)
  return status
}
