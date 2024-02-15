// models/workout.js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: () => new Date().setUTCHours(0, 0, 0, 0) // Set time to midnight by default
      },
  exercises: [{
    name: { type: String, required: true },
    sets: [{
      reps: { type: Number, required: true },
      weight: { type: Number, required: true }
    }]
  }]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
