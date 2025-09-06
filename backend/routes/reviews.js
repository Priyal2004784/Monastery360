const router = require('express').Router();
let Review = require('../models/review.model'); // Import the new Review model

// --- GET REVIEWS FOR A SPECIFIC MONASTERY ---
// URL: GET /reviews/:monasteryId
router.route('/:monasteryId').get((req, res) => {
  Review.find({ monasteryId: req.params.monasteryId })
    .sort({ createdAt: -1 }) // Sort by newest first
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- SUBMIT A NEW REVIEW ---
// URL: POST /reviews/add
router.route('/add').post((req, res) => {
  const { name, email, reviewText, monasteryId } = req.body;

  const newReview = new Review({
    name,
    email,
    reviewText,
    monasteryId,
  });

  newReview.save()
    .then(savedReview => res.json({ message: 'Review added!', review: savedReview }))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;