const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const instanceId = 'instance125960';
  const token = '4hr5b9yj5axgnckb';
  const apiUrl = `https://api.ultramsg.com/${instanceId}/messages/chat`;

  const body = {
    token,
    to: phoneNumber,
    body: `Your SSS App OTP is: ${otp}`
  };

  try {
    await axios.post(apiUrl, body);
    res.status(200).json({ success: true, otp }); // Send OTP back to frontend for localStorage
  } catch (err) {
    console.error('OTP send failed:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

module.exports = router;
