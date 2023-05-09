
const router = require('express').Router();
const { Musician } = require('../../models');
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if musician already exists
    const existingMusician = await Musician.findOne({ where: { email } });
    if (existingMusician) {
      return res.status(400).json({ error: 'Musician already exists.' });
    }

    // Create new musician
    const newMusician = await Musician.create({ name, email, password });
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
      name: musician.name,
      email: musician.email,
    };

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

module.exports = router;
