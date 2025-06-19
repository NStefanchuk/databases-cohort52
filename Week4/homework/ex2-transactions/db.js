require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URL
const client = new MongoClient(uri)
const dbName = 'bank'

async function connectToDatabase() {
  if (!client.topology?.isConnected()) {
    await client.connect()
  }
  const db = client.db(dbName)
  return { db, client }
}

module.exports = { connectToDatabase }
