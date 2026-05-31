const router = require('express').Router();
const Review = require('../models/Review');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/reviews (public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(12);
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/reviews (public - pending approval)
router.post('/', async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, approved: false });
    res.status(201).json({ success: true, data: review, message: 'Review submitted for approval' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH /api/reviews/:id/approve (admin)
router.patch('/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;