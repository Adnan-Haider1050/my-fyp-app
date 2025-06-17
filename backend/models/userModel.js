const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  location: { type: String },
  profession: { type: String },

  // 👇 Added role field
  role: {
    type: String,
    enum: ["admin", "provider", "seeker"], // Valid roles
    required:true // By default, every user is a seeker
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
