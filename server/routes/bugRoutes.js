// server/routes/bugRoutes.js
const express = require('express');
const Bug = require('../models/Bug');

const router = express.Router();

// GET all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bugs' });
  }
});

// POST a new bug
router.post('/', async (req, res) => {
  try {
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create bug' });
  }
});

// PUT update bug status
router.put('/:id', async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBug);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update bug' });
  }
});

// DELETE a bug
router.delete('/:id', async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete bug' });
  }
});

module.exports = router;
