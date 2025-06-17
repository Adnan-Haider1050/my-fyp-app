const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config();

// Route imports
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api',require('./routes/otp.routes'));

// Static folder for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', userRoutes);        // Existing user routes
app.use('/api/requests', requestRoutes);  // New request form CRUD routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
