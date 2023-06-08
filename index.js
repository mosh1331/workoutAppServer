const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Connect to MongoDB
const MONGO_URL = "mongodb+srv://mosh13:mohammed13@cluster0.tyvoi1o.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


  console.log(new Date(8.64e15).toString())
// Define Workout schema
const workoutSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  exercises: [{
    name: { type: String, required: true },
    sets: [{
      reps: { type: Number, required: true },
      weight: { type: Number, required: true }
    }]
  }]
});

// Define Workout model
const Workout = mongoose.model('Workout', workoutSchema);

// Define exercise schema
const exerciseSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  muscle: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);


// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// REST APIs

// Endpoint to add exercises to the collection
app.post('/exercises', async (req, res) => {
  try {
    const exercises = req.body;
    await Exercise.insertMany(exercises);
    res.status(201).json({ message: 'Exercises added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Endpoint to get the list of exercises
app.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Create a new workout
app.post('/workouts', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    const savedWorkout = await workout.save();
    res.json(savedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all workouts
app.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a specific workout
app.get('/workouts/:id', async (req, res) => {
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
app.put('/workouts/:id', async (req, res) => {
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
app.delete('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message + req.params.id });
  }
});

//Delete All
app.delete('/workouts/all', async (req, res) => {
  try {
    await Workout.deleteMany({});
    res.json({ message: 'All workouts deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
