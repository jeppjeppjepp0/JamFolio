
const router = require('express').Router();
const { Musician, MusicianInstruments, Instruments } = require('../../models');

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

// API endpoint to get instruments by its ID
router.get('/:id', async (req, res) => {
    try {
        const instrumentId = req.params.id;
        const instrument = await Instruments.findOne({
            where: { id: instrumentId },
            attributes: ['id', 'name', 'description']
        });

        if (!instrument) {
            return res.status(404).json({
                message: 'Instrument not found'
            });
        }

        res.status(200).json(instrument);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});
  
// API endpoint to get instruments of a specific musician
router.get('/:id/instruments', async (req, res) => {
    try {
        const musicianId = req.params.id;
        const musician = await Musician.findOne({
            where: { id: musicianId },
            attributes: ['id', 'first_name', 'last_name', 'email', 'description'], // Exclude password column
            include: {
                model: Instruments,
                as: 'played_instruments',
                through: {
                    attributes: [] // Exclude through table attributes
                }
            }
        });

        if (!musician) {
            return res.status(404).json({
                message: 'Musician not found'
            });
        }

        const musicianDetails = {
            id: musician.id,
            first_name: musician.first_name,
            last_name: musician.last_name,
            email: musician.email,
            description: musician.description,
            instruments: musician.played_instruments
        };

        res.status(200).json(musicianDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});



module.exports = router;