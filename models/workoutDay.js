// models/workoutDay.js
const mongoose = require('mongoose');

const workoutDaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
});

const WorkoutDay = mongoose.model('WorkoutDay', workoutDaySchema);

module.exports = WorkoutDay;
