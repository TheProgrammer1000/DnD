const express = require('express')
const router = express.Router()

const db = require('../database')

router.get('/all', async (req, res) => {
    let data = await db.findAll()

    return res.json(data)
})

router.post('/add', async (req, res) => {
    /*
name
race
class
level
8
*/
    console.log(req.body)

    const name = await req.body.name
    const race = await req.body.race
    const dnd_class = await req.body.dnd_class
    const level = await req.body.level

    console.log('name: ', name)
    console.log('race: ', race)
    console.log('dnd_class: ', dnd_class)
    console.log('level: ', level)


    try {
        db.insert(name, race, dnd_class, level)

        res.sendStatus(200)
    } catch (error) {

        console.error(error)

        res.sendStatus(500)
    }
})

router.put('/edit', async (req, res) => {
    let _id = await req.body._id
    let name = await req.body.name

    console.log(_id, name)

    try {
        console.log(await db.update(_id, name))

        res.sendStatus(200)
    } catch (error) {


        console.error(error)

        res.sendStatus(500)
    }
})

router.delete('/remove', async (req, res) => {
    let _id = await req.body._id
    let name = await req.body.name


    console.log('id: ', _id)
    console.log('name: ', name);

    try {

        console.log(await db.deleteOne(_id))
        res.sendStatus(200)
    } catch (error) {

        console.error(error)

        res.sendStatus(500)
    }
})

module.exports = router
