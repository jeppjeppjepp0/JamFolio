
const router = require('express').Router();
const { Gigs } = require('../../models');

router.post('/add-gig', async (req, res) => {
    try {
      const { gig_name, location, date, capacity, admission, gig_description } = req.body;
  
      // Check if all required fields are provided
      if (!gig_name || !location || !date || !admission || !gig_description) {
        return res.status(400).json({ error: 'name, location, date, admission, and description are required.' });
      }
      musician_id = req.session.musician.id;
      // Create new gig
      const newGig = await Gigs.create({
        name: gig_name,
        location: location,
        date: date,
        capacity: capacity,
        admission: admission,
        description: gig_description,
        musician_id: musician_id,
      });
  
      return res.status(201).json(newGig);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create gig.' });
    }
  });

module.exports = router;