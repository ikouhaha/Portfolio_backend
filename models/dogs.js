const db = require('../helpers/mongodb')


const collection = "dogs"

exports.getAll =  async function getAll (page, limite, order) {
    let data = await db.run_query(collection, {})
    return data
  }
  
  exports.getById=  async function getById (id) {
    let data = await db.run_query(collection, {'authorID': parseInt(id)})
    return data
  }
  
  exports.add=  async function add (document) {
    let status = await db.run_insert(collection, document)
    return status
  }