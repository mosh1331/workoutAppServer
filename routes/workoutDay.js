// routes/workouts.js
const express = require('express');
const WorkoutDay = require('../models/workoutDay');

const router = express.Router();

// ... (existing code)

// Get all workout days
router.get('/', async (req, res) => {
  try {
    const workoutDays = await WorkoutDay.find();
    res.json(workoutDays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... (other routes)

module.exports = router;
