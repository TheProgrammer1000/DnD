const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3002;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const character = require('./routes/character');
app.use('/character', character);
app.get('/', (req, res) => {
    res.send('Send!!!!')
})

app.listen(PORT, () => {
    console.log('API - Listening on port*:' + PORT);
});
