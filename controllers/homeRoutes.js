const router = require('express').Router();
const { Musician, Gigs, Instruments,  Songs } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const musicianData = await Musician.findAll({
        include: [
            {
                model: Gigs,
                attributes: ['name', 'location', 'date', 'capacity', 'admission', 'description'],
            },
        ],
    });

    const musicians = musicianData.map((user) =>
        user.get({ plain: true })
    );

    res.render('homepage', {
        musicians,
        logged_in: req.session.logged_in 
    });
  } catch (err) {
        console.log(err);
        res.status(500).json(err);
  }
});

// GET one gallery
// router.get('/gallery/:id', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     res.render('gallery', { gallery });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;