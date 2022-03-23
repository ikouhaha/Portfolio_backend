const mongoClient = require("mongodb").MongoClient
const mongoAuth = require('../config')

const mongo_username = mongoAuth.config.user
const mongo_password = mongoAuth.config.password

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.config.host}`
const DATABASE_NAME = mongoAuth.config.database


module.exports = {
  run_query: async (collection, query) => {
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray()
    return result
  },

  run_insert: async (collection, document) => {
    const dbClient = await mongoClient.connect(CONNECTION_URI)
  const seq = await _getNextSequenceValue(dbClient,collection)
  document.id = seq
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
  return { "status": 201, "description": "Data insert successfully" }
  },

  run_insert_many : async (collection, document) => {
    const dbClient = await mongoClient.connect(CONNECTION_URI)

    for (const index in document) {  
      const seq = await _getNextSequenceValue(dbClient,collection)
      document[index].id = seq
    }
    const result = await dbClient.db(DATABASE_NAME).collection(collection).insertMany(document)
    return { "status": 201, "description": "Data insert successfully" }
  },

  getNextSequenceValue: async (sequenceName) => {
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    var sequenceDocument = await dbClient.db(DATABASE_NAME).collection("counters").findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { returnNewDocument: true, upsert: true }

    );
    return sequenceDocument.value.sequence_value;
  },

  _getNextSequenceValue: async (dbClient,sequenceName) => {
    var sequenceDocument = await dbClient.db(DATABASE_NAME).collection("counters").findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { returnNewDocument: true, upsert: true }

    );
    return sequenceDocument.value.sequence_value;
  }
}



async function _getNextSequenceValue(dbClient,sequenceName) {
  var sequenceDocument = await dbClient.db(DATABASE_NAME).collection("counters").findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnNewDocument: true, upsert: true }

  );
  return sequenceDocument.value.sequence_value;
}