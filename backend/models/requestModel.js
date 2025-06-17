const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: {
  type: String,
  enum: ['pending', 'completed'],
  default: 'pending'
}
}, { timestamps: true });
module.exports = mongoose.model('Request', requestSchema);