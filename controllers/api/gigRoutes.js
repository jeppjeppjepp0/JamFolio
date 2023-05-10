
const router = require('express').Router();
const { Gigs } = require('../../models');

router.post('/add-gig', async (req, res) => {
    try {
      const { name, location, date, capacity, admission, description, musician_id } = req.body;
  
      // Check if all required fields are provided
      if (!name || !location || !date || !admission || !description || !musician_id) {
        return res.status(400).json({ error: 'name, location, date, admission, description, and musician_id are required.' });
      }
  
      // Create new gig
      const newGig = await Gigs.create({
        name,
        location,
        date,
        capacity,
        admission,
        description,
        musician_id,
      });
  
      return res.status(201).json(newGig);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create gig.' });
    }
  });

module.exports = router;