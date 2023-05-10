
const router = require('express').Router();
const { Instruments } = require('../../models');

// Get all instruments

router.get('/', async (req, res) => {
    try {
      const instruments = await Instruments.findAll();
      res.status(200).json(instruments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve instruments.' });
    }
  });
  

// Get instruments of a specific musician

module.exports = router;