// The final, corrected, and improved routes file
const router = require('express').Router();
let Monastery = require('../models/monastery.model');

// --- Routes for the collection (/monasteries) ---
router.route('/')
  .get((req, res) => { // Handles GET /monasteries
    Monastery.find()
      .then(monasteries => res.json(monasteries))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// The FINAL corrected /add route in backend/routes/monasteries.js
router.route('/add').post((req, res) => {
  const newMonastery = new Monastery({
    name: req.body.name,
    district: req.body.district,
    history: req.body.history,
    coordinates: req.body.coordinates,
    tags: req.body.tags,
    panoImage_url: req.body.panoImage_url
  });

  newMonastery.save()
    .then(() => res.json('Monastery added!'))
    .catch(err => res.status(400).json('Error: ' + err)); // <-- TYPO FIXED HERE
});
router.route('/search')
  .get((req, res) => { // Handles GET /monasteries/search
    const query = req.query.q;
    const filter = query ? { tags: { $regex: query, $options: 'i' } } : {};
    Monastery.find(filter)
      .then(monasteries => res.json(monasteries))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// --- Routes for a specific item (/monasteries/:id) ---
// This is the improved way to handle multiple methods on the same path
router.route('/:id')
  .get((req, res) => { // Handles GET /monasteries/:id
    Monastery.findById(req.params.id)
      .then(monastery => res.json(monastery))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .delete((req, res) => { // Handles DELETE /monasteries/:id
    Monastery.findByIdAndDelete(req.params.id)
      .then(() => res.json('Monastery deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .put((req, res) => { // --- NEW UPDATE (PUT) ROUTE ---
    Monastery.findByIdAndUpdate(req.params.id, req.body) // Find by ID and update with the request body
      .then(() => res.json('Monastery updated.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;