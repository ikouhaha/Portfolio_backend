


const collection = "articles"

exports.getAll = async function getAll(db, page, limite, order) {
  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async function getById(db, id) {
  let data = await db.run_query(collection, { 'authorID': parseInt(id) })
  return data
}

exports.add = async function add(db, document) {
  let status = await db.run_insert(collection, document)
  return status
}