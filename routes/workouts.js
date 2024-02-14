// routes/workouts.js
const express = require('express');
const Workout = require('../models/workout');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    const savedWorkout = await workout.save();
    res.json(savedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add other workout routes (get all, get by id, update, delete) here
// Read all workouts
router.get('/', async (req, res) => {
    try {
      const workouts = await Workout.find();
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Read a specific workout
  router.get('/:id', async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json(workout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update a workout
  router.put('/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json(workout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a workout
  router.delete('/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndDelete(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json({ message: 'Workout deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //Delete All
  router.delete('/clearAll', async (req, res) => {
    try {
      await Workout.deleteMany({});
      res.json({ message: 'All workouts deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
