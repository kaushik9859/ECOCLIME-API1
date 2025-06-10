const express = require('express');
const router = express.Router();
const { getVegetationHealth } = require('../services/vegetationService');

router.post('/', async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const vegetationData = await getVegetationHealth(location);
    res.json(vegetationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze vegetation' });
  }
});

module.exports = router;