const config = require('./config')
const { MongoClient } = require('mongodb')

const connectionString = config.CONNECTION_STRING
const client = new MongoClient(connectionString)

const db = client.db('DnD') // Den här databasen
const collection = db.collection('character') // Den här kollektionen (collection)

const ObjectId = require('mongodb').ObjectId

async function findAll() {
    await client.connect() // Anslut

    // const projection = { name: 1, summary: 1 } // Filtrering

    // const limit = 20 // Filtrering

    let data = await collection
        .find()
        // .project(projection) // Ge mig bara fältet name
        // .limit(limit) // Ge mig bara 3 dokument
        .toArray()

    client.close() // Stäng anslutning

    return data
}

async function insert(name, race, dnd_class, level) {
    await client.connect() // Anslut

    let result = await collection.insertOne({
        name: name,
        race: race,
        dnd_class: dnd_class,
        level: level
    }) // Lägg till ett dokument

    client.close() // Stäng anslutning

    return result // Returnera result (innehåller eventuella felmeddelanden)
}

async function update(_id, name) {
    await client.connect() // Anslut

    let result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { name: name } }
    ) // Lägg till ett dokument

    client.close() // Stäng anslutning

    return result // Returnera result (innehåller eventuella felmeddelanden)
}

async function deleteOne(name) {
    await client.connect() // Anslut

    // let result = await collection.deleteOne({ _id: new ObjectId(_id) }) // Lägg till ett dokument

    let result = await collection.deleteOne({ name: name }) // Lägg till ett dokument

    client.close() // Stäng anslutning

    return result // Returnera result (innehåller eventuella felmeddelanden)
}

module.exports = {
    findAll,
    insert,
    update,
    deleteOne
}
