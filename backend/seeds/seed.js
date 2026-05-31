const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('../models/Service');
const Review = require('../models/Review');
const User = require('../models/User');
const serviceSeeds = require('./services');
const reviewSeeds = require('./reviews');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected for seeding');

    // Clear existing data
    await Service.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️ Cleared existing services and reviews');

    await Service.insertMany(serviceSeeds);
    console.log(`🌱 Seeded ${serviceSeeds.length} service records.`);

    await Review.insertMany(reviewSeeds);
    console.log(`🌱 Seeded ${reviewSeeds.length} review records.`);

    // Seed Admin — always recreate to ensure password is properly hashed
    let adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    let adminPassword = process.env.ADMIN_PASSWORD || 'Admin123';
    await User.deleteOne({ email: adminEmail });
    await User.create({ name: 'Admin', email: adminEmail, password: adminPassword, role: 'admin' });
    console.log('🌱 Admin user seeded (password hashed via pre-save hook)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
