const mongoClient = require("mongodb").MongoClient
const mongoAuth = require('../config')

const mongo_username = mongoAuth.config.user
const mongo_password = mongoAuth.config.password

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.config.host}`
const DATABASE_NAME = mongoAuth.config.database
const util = require('../helpers/util')


exports.run_query = async (collection, query,order,skip,limit) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query)
  if(order){
    result.sort(order)
  }
  if(skip){
    result.skip(skip)
  }
  if(limit){
    result.limit(limit)
  }
  return result.toArray()
}



exports.run_one_query = async (collection, query) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).findOne(query)
  return result
}

exports.run_insert = async (collection, document) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const seq = await _getNextSequenceValue(dbClient, collection)
  document.id = seq
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
  return { "status": 201, "description": "Data insert successfully" }
}

exports.run_update = async (collection, query, document) => {
  let cloneDoc = util.clone(document);
  if ('_id' in cloneDoc) {
    delete cloneDoc._id;
  }

  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).updateOne(
    query,
    { $set: cloneDoc }
  )
  return { "status": 201, "description": `${result.modifiedCount} Data update successfully` }
}

exports.run_delete = async (collection, query) => {

  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).deleteOne(query)
  return { "status": 201, "description": `${result.deletedCount} data delete successfully` }
}

exports.run_insert_many = async (collection, document) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)

  for (const index in document) {
    const seq = await _getNextSequenceValue(dbClient, collection)
    document[index].id = seq
  }
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertMany(document)
  return { "status": 201, "description": "Data insert successfully" }
}

exports.getNextSequenceValue = async (sequenceName) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  var sequenceDocument = await dbClient.db(DATABASE_NAME).collection("counters").findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnNewDocument: true, upsert: true }

  );
  return sequenceDocument.value.sequence_value;
}

_getNextSequenceValue = async (dbClient, sequenceName) => {
  var sequenceDocument = await dbClient.db(DATABASE_NAME).collection("counters").findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnNewDocument: true, upsert: true }

  );
  return sequenceDocument.value.sequence_value;
}




