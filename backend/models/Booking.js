const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service:   { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceName: { type: String },
  date:      { type: String, required: true },
  time:      { type: String, required: true },
  name:      { type: String, required: true, trim: true },
  phone:     { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  address:   { type: String, required: true, trim: true },
  notes:     { type: String, trim: true },
  status:    { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);