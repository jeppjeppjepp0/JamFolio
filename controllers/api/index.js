const router = require('express').Router();
const musicianRoutes = require('./musicianRoutes');
const instrumentRoutes = require('./instrumentRoutes');
const songRoutes = require('./songRoutes');
// const gigRoutes = require('./gigRoutes');
// const mediaRoutes = require('./mediaRoutes');

router.use('/musician', musicianRoutes);
router.use('/instrument', instrumentRoutes);
router.use('/song', songRoutes);
// router.use('/gig', gigRoutes);
// router.use('/media', mediaRoutes);

module.exports = router;
