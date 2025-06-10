const express = require('express');
const router = express.Router();
const { generateChatResponse } = require('../services/geminiService');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await generateChatResponse(message);
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

module.exports = router;