const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber.model');

// POST: Subscribe user
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const newSub = new Subscriber({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: 'Already subscribed' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

module.exports = router;
