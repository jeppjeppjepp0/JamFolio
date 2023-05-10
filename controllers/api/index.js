const router = require('express').Router();
const musicianRoutes = require('./musicianRoutes');
const instrumentRoutes = require('./instrumentRoutes');
const songRoutes = require('./songRoutes');
const gigRoutes = require('./gigRoutes');

router.use('/musician', musicianRoutes);
router.use('/instrument', instrumentRoutes);
router.use('/song', songRoutes);
router.use('/gig', gigRoutes);

module.exports = router;
