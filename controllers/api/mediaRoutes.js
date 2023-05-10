const router = require('express').Router();
const upload = require('../../config/cloudinary'); // Import the upload middleware

router.post('/upload', upload.single('media'), async (req, res) => {
  try {
    const musicianId = req.body.musician_id;
    const musician = await Musician.findByPk(musicianId);

    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }
    console.log(req.file);
    const mediaType = req.file.mimetype.split('/')[0];

    // Use the Cloudinary secure URL instead of the local file path
    const newMedia = await Media.create({
      musician_id: musicianId,
      media_type: mediaType,
      media_url: req.file.path, // Save the Cloudinary secure URL
    });

    res.status(200).json({
      message: 'Media uploaded successfully',
      media_url: req.file.path, // Return the Cloudinary secure URL
      media_id: newMedia.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;