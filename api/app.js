const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3002

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const people = require('./routes/people')
app.use('/people', people)

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.listen(PORT, () => {
    console.log('API - Listening on port*:' + PORT)
})
