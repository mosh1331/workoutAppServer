// routes/workouts.js
const express = require('express')
const Workout = require('../models/workout')
const WorkoutDay = require('../models/workoutDay')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { date } = req.body

    // Set the UTC hours of the date to 0
    const adjustedDate = new Date(date)
    adjustedDate.setUTCHours(0, 0, 0, 0)

    let workoutDay = await WorkoutDay.findOne({ date: adjustedDate })

    if (!workoutDay) {
      // If no WorkoutDay exists, create a new one
      workoutDay = new WorkoutDay({ date: adjustedDate })
      await workoutDay.save()
    }

    const workout = new Workout(req.body)
    const savedWorkout = await workout.save()
    res.json(savedWorkout)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Read all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get according to date
router.get('/date/:date', async (req, res) => {
  try {
    const requestedDate = new Date(req.params.date)

    // Set the time to midnight of the requested date to compare only the date part
    requestedDate.setUTCHours(0, 0, 0, 0)

    const workouts = await Workout.findOne({
      date: requestedDate
    })

    res.json(workouts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Read a specific workout
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }
    res.json(workout)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Update a workout
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }
    res.json(workout)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a workout
router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id === 'all') {
      await Workout.deleteMany({})
      res.json({ message: 'All workouts deleted' })
    }
    const workout = await Workout.findByIdAndDelete(req.params.id)
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }
    res.json({ message: 'Workout deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Delete All
router.delete('/clearAll/', async (req, res) => {
  try {
    await Workout.deleteMany({})
    res.json({ message: 'All workouts deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
