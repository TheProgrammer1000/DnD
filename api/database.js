const config = require('./config');
const { MongoClient } = require('mongodb');

const connectionString = config.CONNECTION_STRING;
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = client.db('RatingApp');
const collection = db.collection('People');

const ObjectId = require('mongodb').ObjectId;

async function findAll() {
    await client.connect();
    try {
        let data = await collection.find().toArray();
        return data;
    } finally {
        client.close();
    }
}

async function insert(personData) {
    await client.connect();
    try {
        let result = await collection.insertOne(personData);
        return result;
    } finally {
        client.close();
    }
}

// Include other functions (update, delete, etc.) if needed

module.exports = {
    findAll,
    insert,
    // Export other functions as needed
};
