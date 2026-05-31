const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  emoji: { type: String, default: '🧹' },
  image: { type: String, default: '' },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: '/session' },
  category: { type: String, enum: ['residential', 'commercial', 'specialty'], default: 'residential' },
  popular: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);