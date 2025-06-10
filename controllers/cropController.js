const express = require('express');
const router = express.Router();
const { detectTopCrops } = require('../services/cropService');

router.post('/', async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const crops = await detectTopCrops(location);
    res.json({ crops });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get crop recommendations' });
  }
});

module.exports = router;