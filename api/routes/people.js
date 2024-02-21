const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/all', async (req, res) => {
    try {
        let data = await db.findAll();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

router.post('/add', async (req, res) => {
    const personData = req.body;

    try {
        await db.insert(personData);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// New rankings endpoint
router.get('/rankings', async (req, res) => {
    try {
        let people = await db.findAll(); // Fetch all people data
        const masterNumber = 5; // Example master number

        // Calculate a "closeness" score for each person's preferences
        people = people.map(person => {
            let closenessScore = 0;
            Object.values(person.preferences).forEach(value => {
                closenessScore += Math.abs(masterNumber - value); // Calculate difference from master number
            });
            return { ...person, closenessScore };
        });

        // Sort people by their closeness scores
        people.sort((a, b) => a.closenessScore - b.closenessScore);

        res.json(people); // Send the ranked list of people back in the response
    } catch (error) {
        console.error('Error calculating rankings:', error);
        res.status(500).json({ message: 'Error calculating rankings' });
    }
});


module.exports = router;
