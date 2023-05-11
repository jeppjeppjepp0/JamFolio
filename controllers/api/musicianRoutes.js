
const router = require('express').Router();
const { Musician } = require('../../models');
const bcrypt = require('bcrypt');
const upload = require('../../config/cloudinary')

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, email, password, description } = req.body;

    // Check if name, email, and password are provided
    if (!first_name || !last_name || !email || !password || !description) {
      return res.status(400).json({ error: 'first name, last name, email, password and description are required.' });
    }

    // Check if musician already exists
    const existingMusician = await Musician.findOne({ where: { email } });
    if (existingMusician) {
      return res.status(400).json({ error: 'Musician already exists.' });
    }

    // Create new musician
    const newMusician = await Musician.create({ first_name, last_name, email, password, description });

    // Store musician data in session
    req.session.musician = {
      id: newMusician.id,
      email: newMusician.email
    };
    req.session.logged_in = true;

    return res.status(201).json(newMusician);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create musician.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if musician exists in the database
    const musician = await Musician.findOne({ where: { email } });
    if (!musician) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, musician.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Store musician data in session
    req.session.musician = {
      id: musician.id,
      email: musician.email
    };
    req.session.logged_in = true;

    res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to login.' });
  }
});

// Logout route
router.post('/logout', async (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Session cleared.' });
});

// Add profile URL for musician
router.put('/upload-profile-image', upload.single('profile_image'), async (req, res) => {
  try {
    const musicianId = req.session.musician.id;
    const musician = await Musician.findByPk(musicianId);

    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }

    const profileImageUrl = req.file.path;

    const updatedMusician = await Musician.update(
      { profile_url: profileImageUrl },
      { where: { id: musicianId } }
    );

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      profile_url: profileImageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});


// Get all musicians

router.get('/', async (req, res) => {
  try {
    const musicians = await Musician.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'description']
    });
    res.status(200).json(musicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve musicians.' });
  }
});

// Get musician by Id

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const musician = await Musician.findByPk(id, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'description']
    });
    if (!musician) {
      return res.status(404).json({ error: 'Musician not found.' });
    }
    res.status(200).json(musician);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve musician.' });
  }
});



// Get all musician for given instrument
// To be implemented by Aarti

// Get all musician for given Genre
// To be implemented by Aarti

module.exports = router;
