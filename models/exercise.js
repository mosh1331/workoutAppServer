// models/exercise.js
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  muscle: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
