const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const workoutRoutes = require('./routes/workouts');

const MONGO_URL = "mongodb+srv://mosh13:mohammed13@cluster0.tyvoi1o.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/exercises', exerciseRoutes);
app.use('/workouts', workoutRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
