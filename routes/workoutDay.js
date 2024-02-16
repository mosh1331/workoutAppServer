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


router.get('/currentStreak', async (req, res) => {
    try {
      const workoutDays = await WorkoutDay.find().sort({ date: 'desc' });
  
      if (workoutDays.length === 0) {
        return res.json({ currentStreak: 0 });
      }
  
      let currentStreak = 1;
      const today = new Date();
      let currentDate = new Date(workoutDays[0].date);
  
      for (let i = 1; i < workoutDays.length; i++) {
        const prevDate = new Date(workoutDays[i - 1].date);
        const currentDate = new Date(workoutDays[i].date);
  
        // Check if the days are consecutive
        if (
          currentDate.getDate() === prevDate.getDate() - 1 &&
          currentDate.getMonth() === prevDate.getMonth() &&
          currentDate.getFullYear() === prevDate.getFullYear()
        ) {
          currentStreak++;
        } else {
          break; // Break the loop if not consecutive
        }
      }
  
      res.json({ currentStreak });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// ... (other routes)

module.exports = router;
