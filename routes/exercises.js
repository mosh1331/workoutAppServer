// routes/exercises.js
const express = require('express');
const Exercise = require('../models/exercise');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const exercises = req.body;
    await Exercise.insertMany(exercises);
    res.status(201).json({ message: 'Exercises added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
