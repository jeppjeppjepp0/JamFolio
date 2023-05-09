const sequelize = require('../config/connection.js');
const { Musician, Instruments, Gigs, Songs } = require('../models');
const { MusicianInstruments, MusicianSongs } = require('../models/connectors');

const musicianData = require('./musicianData.json');
const instrumentData = require('./instrumentData.json');
const gigData = require('./gigData.json');
const songData = require('./songData.json');
const musInstLink = require('./musInst.json');
const musSongLink = require('./musSong.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const musicians = await Musician.bulkCreate(musicianData, {
        individualHooks: true,
        returning: true,
    });

    const instruments = await Instruments.bulkCreate(instrumentData);

    const gigs = await Gigs.bulkCreate(gigData);

    const songs = await Songs.bulkCreate(songData);

    const musInst = await MusicianInstruments.bulkCreate(musInstLink);

    const musSong = await MusicianSongs.bulkCreate(musSongLink);

    process.exit(0);
};

seedDatabase();