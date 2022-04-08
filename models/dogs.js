const db = require('../helpers/mongodb')


const collection = "dogs"

exports.getAll = async function (page, limit, order) {
  let data = await db.run_query(collection, {})
  return data
}

exports.getAllByFilter = async function (filterData,page, limit, order={id:-1}) {
  let data = await db.run_query(collection, filterData,order,(page-1)*limit,limit)
  return data
}

exports.getById = async function (id) {
  let data = await db.run_one_query(collection, { 'id': parseInt(id) })
  return data
}

exports.delete = async function (id) {
  let data = await db.run_delete(collection, { 'id': parseInt(id) })
  return data
}

exports.update = async function (id,document) {
  let data = await db.run_update(collection,{ 'id': parseInt(id) }, document)
  return data
}


exports.add = async function (document) {
  let status = await db.run_insert(collection, document)
  return status
}

