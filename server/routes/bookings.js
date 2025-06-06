const express = require('express');
const router = express.Router();

// POST /api/bookings - placeholder
router.post('/', (req, res) => {
  res.json({ success: true }); // Will handle booking later
});

module.exports = router; 