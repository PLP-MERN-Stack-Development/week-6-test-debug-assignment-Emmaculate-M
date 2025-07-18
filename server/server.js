// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/bugs', bugRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Bug Tracker API is running...');
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/mern-bug-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
