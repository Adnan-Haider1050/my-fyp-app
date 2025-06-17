// backend/routes/testRoutes.js

const express = require('express');
const router = express.Router();

// Controller
const { testApi } = require('../controllers/testController');

// Route
router.get('/test', testApi);

module.exports = router;
