const config = require('./config')
const { MongoClient } = require('mongodb')

const connectionString = config.CONNECTION_STRING
const client = new MongoClient(connectionString)

const db = client.db('DnD')
const collection = db.collection('character')

const ObjectId = require('mongodb').ObjectId

async function findAll() {
    await client.connect()

    let data = await collection
        .find()
        .toArray()

    client.close()

    return data
}

async function insert(name, race, dnd_class, level) {
    await client.connect()

    let result = await collection.insertOne({
        name: name,
        race: race,
        dnd_class: dnd_class,
        level: level
    })

    client.close()

    return result
}

async function update(_id, name) {
    await client.connect()

    let result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { name: name } }
    )

    client.close()

    return result
}

async function deleteOne(id) {
    await client.connect()


    let result = await collection.deleteOne({ "_id": new ObjectId(id) })

    client.close()

    return result 
}

module.exports = {
    findAll,
    insert,
    update,
    deleteOne
}
