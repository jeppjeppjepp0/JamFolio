const router = require('express').Router();
const { Songs, MusicianSongs } = require('../../models');
const upload = require('../../config/cloudinary');

router.post('/add-song', upload.single('song_file'), async (req, res) => {
  try {
    const { name, description, genre, original_author } = req.body;
    const songUrl = req.file.path; 
    const newSong = await Songs.create({
      name: name,
      description: description,
      genre: genre,
      original_author: original_author,
      songs_url: songUrl,
    });

    const musicianSongs = await MusicianSongs.create({
      musician_id: req.session.musician.id,
      songs_id: newSong.id
    });

    res.status(200).json({
      message: 'Song added successfully',
      song_id: newSong.id,
      songs_url: songUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;